# Introducing MUI v5 to CocosCreator

The setup method is a little different from [How to install React only](../README.md), the setup procedure is slightly different.

The same procedure can be used for installation, but there is a problem.

```tsx
// 1. this is usable
import { Button } from "@mui/material"

// 2. this does not work
import Button from "@mui/material/Button"
```

If you import using method 1, all components will be included in the build, and the output size will be bloated by about 3MB in the Release build.

To prevent this, the import method in 2 is officially recommended, but the same procedure cannot be used.

To be able to import using method 2, output the tsx file as a CommonJS module when converting it to js in Babel.

## preset-env install.

```sh
npm install --save-dev @babel/preset-env
```

Edit ``.babelrc``.

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
}
```

## Do not convert js → ts

### import-map.json configuration.

```json
{
  "imports": {
    "react-components": "./assets/react/dist/index.js",
    "react-components/": "./assets/react/dist/"
  }
}
```

### Run Babel using either.

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

That's it for setup.

### Notes on using CommonJS modules

As a precaution for importing non-TypeScript CommonJS modules to CocosCreator, if you import the same module in both js and ts, the module will be duplicated and included in the build.

Therefore, it is recommended that modules such as React and MUI be referenced only in the tsx file for creating React components, and not from the TypeScript created for CocosCreator.

For example, in the method of introducing only React, the creation of the root element using ReactDOM was executed in the Main.ts script on the CocosCreator side, but this is included in the tsx file and only functions are exposed.

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
// ↓ Cannot write this way in CommonJS module
// import { renderRoot } from 'react-components';

import RC from 'react-components';

const gameDiv = document.getElementById('GameDiv');
const reactDiv = document.createElement('div');
reactDiv.id = 'react-root';
gameDiv.appendChild(reactDiv);
RC.renderRoot(reactDiv);
```

## Ex. Adding Babel plugin (Build size & emotion)

By adding the Babel plugin, the following conversions are automatically performed, preventing unintentional increase in build size.

```tsx
import { Button } from "@mui/material"
// ↓ Converts to this way when transpiling.
import Button from "@mui/material/Button"
```

In addition, will also set up CSSinJS capable `@emotion/react` to be transposable.

### Installation

```sh
npm install --save-dev babel-plugin-import
npm install --save-dev @emotion/babel-plugin
```

### Settings

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
    /* If you use "icons", you can also use this */
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

Add `emotion/react/types/css-prop` to types in tsconfig. `/temp/tsconfig.cocos.json` from which tsconfig is extended, or it will not be reflected.

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
