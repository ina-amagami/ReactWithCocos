# MUI v5をCocosCreatorに導入する

[Reactのみを導入する方法](../README_JP.md)とはセットアップ方法が少し異なります。

同じ手順で導入しても使用は可能ですが、問題があります。

```tsx
// 1. これは使える
import { Button } from "@mui/material"

// 2. これは使えない
import Button from "@mui/material/Button"
```

1の方法でインポートすると全てのコンポーネントがビルドに含まれてしまい、Releaseビルドで約3MBほど出力サイズが肥大化します。

これを防ぐため2のインポート方法が公式でも推奨されていますが、同じ手順では使用できません。

2の方法でインポートできるようにするには、Babelでtsxファイルをjsにコンバートする際にCommonJSモジュールとして出力します。

## preset-envを導入

```sh
npm install --save-dev @babel/preset-env
```

`.babelrc`を編集

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
}
```

## js → tsへの変換は行わない

### import-mapを修正

```json
{
  "imports": {
    "react-components": "./assets/react/dist/index.js",
    "react-components/": "./assets/react/dist/"
  }
}
```

### いずれか使用してBabelを実行

`.tsconfig`
```json
  "scripts": {
    "react": "node tools/clean-react-dist.js && ./node_modules/.bin/babel --extensions '.js,.ts,.jsx,.tsx' ./assets/react/src/ -d ./assets/react/dist/ --watch"
  },
```

`React.sh`
```sh
node tools/clean-react-dist.js && ./node_modules/.bin/babel --extensions '.js,.ts,.jsx,.tsx' ./assets/react/src/ -d ./assets/react/dist/ --watch
```

セットアップは以上です。

### CommonJSモジュールを使用する注意点

CocosCreatorへTypeScriptではないCommonJSモジュールをインポートする注意点として、jsとtsの双方で同じモジュールをインポートすると、モジュールが重複してビルドに含まれます。

そのためReactやMUI等のモジュールは、Reactコンポーネントを作成するためのtsxファイルのみで参照し、CocosCreator用に作成するTypeScriptから参照しないことを推奨します。

例えばReactのみを導入する方法ではReactDOMを使用したルート要素の作成をCocosCreator側のMain.tsスクリプトで実行していましたが、これをtsxファイル内に含めてfunctionのみ公開します。

`index.tsx`
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const ReactRoot: React.FC = () => {
    return (
        <React.StrictMode>
          <App />
        </React.StrictMode>
    );
};

export function renderRoot(div: HTMLDivElement) {
    const root = ReactDOM.createRoot(div);
    root.render(ReactRoot({}));
}

export default { renderRoot }
```

`Main.ts`
```ts
// CommonJSモジュールでこの書き方はできない
// import { renderRoot } from 'react-components';

import RC from 'react-components';

const gameDiv = document.getElementById('GameDiv');
const reactDiv = document.createElement('div');
reactDiv.id = 'react-root';
gameDiv.appendChild(reactDiv);
RC.renderRoot(reactDiv);
```

## Ex. Babelプラグイン追加（サイズ対策・emotion設定）

更にBabelプラグインを追加することで以下の変換を自動で行ってくれるようになり、意図せずビルドサイズが膨らむことを防止できます。

```tsx
import { Button } from "@mui/material"
// ↓ トランスパイル時にこちらへ変換してくれる
import Button from "@mui/material/Button"
```

### インストール

```sh
npm install --save-dev babel-plugin-import
```

### 設定

ついでにCSSinJSができるemotionもトランスパイル可能なように設定します。

`.babelrc`

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    ["@babel/preset-react", {
      "runtime": "automatic",
      "importSource": "@emotion/react"
    }]
  ],
  "plugins": [
    [
      "babel-plugin-import",
      {
        "libraryName": "@mui/material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "core"
    ],
    /* iconsを利用する場合はこちらも */
    [
      "babel-plugin-import",
      {
        "libraryName": "@mui/icons-material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "icons"
    ]
  ]
}

```

tsconfigのtypesに`emotion/react/types/css-prop`を追加する。tsconfigの継承元である`./temp/tsconfig.cocos.json` の内容も入れておかないと反映されなくなるので注意。

`.tsconfig`
```json
"compilerOptions": {
  "types": [
    "./temp/declarations/cc.custom-macro",
    "./temp/declarations/cc",
    "./temp/declarations/jsb",
    "./temp/declarations/cc.env",
    "@emotion/react/types/css-prop"
  ],
```