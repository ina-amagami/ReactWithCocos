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

Run Babel using either.

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

## import-map.json configuration.

```json
{
  "imports": {
    "react-components": "./assets/react/dist/index.js",
    "react-components/": "./assets/react/dist/"
  }
}
```

## Using components from TypeScript.

```ts
// Cannot write this way in CommonJS module
// import { ReactApp } from 'react-components';

import RC from 'react-components';
const { ReactApp } = RC;.

root.render(ReactApp());
```

This is all... You don't have to go through the special process of converting from js to ts, so even if you don't use MUI, this might be better, although it is a hassle to add one more line on the user's side.

## Ex. Adding Babel plugin

By adding the Babel plugin, the following conversions are automatically performed, preventing unintentional increase in build size.

```tsx
import { Button } from "@mui/material"
// ↓ Converts to this way when transpiling.
import Button from "@mui/material/Button"
```

### Installation

```sh
npm install --save-dev babel-plugin-import
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
      "babel-plugin-import",
      {
        "libraryName": "@mui/material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "core"
    ],
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