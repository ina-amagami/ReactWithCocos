import { _decorator, Component, Node, resources, Asset, TextAsset } from 'cc';
import { EDITOR, EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

import reactDOM from 'react-dom/client';
const { createRoot } = reactDOM;
import { App } from './generated/ReactComponents';

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
                const root = createRoot(reactDiv);
                root.render(App());
            }
        }
    }

    update(deltaTime: number) {
    }
}
