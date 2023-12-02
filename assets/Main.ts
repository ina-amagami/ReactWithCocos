import { _decorator, Component, Node, resources, Asset, TextAsset } from 'cc';
import { EDITOR, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

import ReactDOM from 'react-dom/client';
import { ReactApp } from './react/index';

@ccclass('Main')
export class Main extends Component {
    start() {
        if (!EDITOR_NOT_IN_PREVIEW) {
            resources.load('css/react', TextAsset, (err, asset) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const style = document.createElement('style');
                style.appendChild(document.createTextNode(asset.text));
                document.head.appendChild(style);
            });

            const gameDiv = document.getElementById('GameDiv');
            if (gameDiv) {
                const reactDiv = document.createElement('div');
                reactDiv.id = 'react-app';
                gameDiv.appendChild(reactDiv);
                const root = ReactDOM.createRoot(reactDiv);
                root.render(ReactApp());
            }
        }
    }

    update(deltaTime: number) {
    }
}
