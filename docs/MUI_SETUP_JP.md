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

いずれか使用してBabelを実行

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

## import-mapの設定

```json
{
  "imports": {
    "react-components": "./assets/react/dist/index.js",
    "react-components/": "./assets/react/dist/"
  }
}
```

## TypeScriptからコンポーネントを利用する

```ts
// CommonJSモジュールでこの書き方はできない
// import { ReactApp } from 'react-components';

import RC from 'react-components';
const { ReactApp } = RC;

root.render(ReactApp());
```

以上です。js→tsへの変換という特殊な工程を踏まなくても済むので、利用側で1行増えてしまう点は面倒ではありますがMUIを使わない場合でもこちらの方がいいかもしれませんね。

## Ex. Babelプラグイン追加（サイズ対策・emotion設定）

更にBabelプラグインを追加することで以下の変換を自動で行ってくれるようになり、意図せずビルドサイズが膨らむことを防止できます。

```tsx
import { Button } from "@mui/material"
// ↓ トランスパイル時にこちらへ変換してくれる
import Button from "@mui/material/Button"
```

ついでにCSSinJSができるemotionもトランスパイル可能なように設定します。

### インストール

```sh
npm install --save-dev babel-plugin-import
npm install --save-dev @emotion/babel-plugin
```

### 設定

`.babelrc`

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@emotion/babel-plugin"
    ],
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