import { _decorator, Component, Node, resources, TextAsset, Prefab, director, instantiate } from 'cc';
import { EDITOR_NOT_IN_PREVIEW } from 'cc/env';
const { ccclass, property } = _decorator;

import ReactDOM from 'react-dom/client';
import { ReactApp, IAppViewModel } from 'react-app';

@ccclass('Main')
export class Main extends Component {

    @property(Prefab)
    private cubePrefab: Prefab;
    @property(Prefab)
    private spherePrefab: Prefab;

    private isSphere: boolean;
    private viewModel: IAppViewModel;

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
                this.viewModel = {
                    toggleVM: {
                        offText: "Cube",
                        onText: "Sphere",
                        defaultValue: false,
                        onToggleChange: (x) => this.isSphere = x
                    },
                    onClickButton: () => {
                        this.createObject();
                    }
                }
                root.render(ReactApp(this.viewModel));
            }
        }
    }

    createObject() {
        const prefab = this.isSphere ? this.spherePrefab : this.cubePrefab;
        director.getScene().addChild(instantiate(prefab));
    }

    update(deltaTime: number) {
    }
}
