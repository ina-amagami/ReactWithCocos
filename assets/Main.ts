import { _decorator, Component, Node } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

import reactDOM from 'react-dom/client';
const { createRoot } = reactDOM;
// import reactApp from './react-components/App.js';
// const { App } = reactApp;

@ccclass('Main')
export class Main extends Component {
    start() {
        if (!EDITOR_NOT_IN_PREVIEW) {
            // const root = createRoot(document.getElementById('react-app'));
            const root = createRoot(document.getElementById('GameDiv'));
            // root.render(App());
        }
    }

    update(deltaTime: number) {
    }
}
