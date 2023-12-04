import { _decorator, Component, Node, resources, TextAsset, Prefab, director, instantiate, Font, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;

import ReactDOM from 'react-dom/client';
import { ReactApp, IAppViewModel } from 'react-app';

import capacitorSafeArea from 'capacitor-plugin-safe-area';
const { SafeArea } = capacitorSafeArea;

@ccclass('Main')
export class Main extends Component {

    @property(Prefab)
    private cubePrefab: Prefab;
    @property(Prefab)
    private spherePrefab: Prefab;

    @property(ImageAsset)
    private image: ImageAsset;

    private isSphere: boolean;
    private viewModel: IAppViewModel;

    start() {
        // Load css.
        resources.load('css/react', TextAsset, (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            const style = document.createElement('style');
            style.appendChild(document.createTextNode(asset.text));
            document.head.appendChild(style);
        });

        // Add react root.
        const gameDiv = document.getElementById('GameDiv');
        const reactDiv = document.createElement('div');
        reactDiv.id = 'react-app';
        gameDiv.appendChild(reactDiv);
        const root = ReactDOM.createRoot(reactDiv);

        // Create react app.
        this.viewModel = {
            toggleVM: {
                offText: "Cube",
                onText: "Sphere",
                defaultValue: false,
                onToggleChange: (x) => this.isSphere = x
            },
            buttonText: "Instantiate",
            imgUrl: this.image.nativeUrl,
            onClickButton: () => {
                this.createObject();
            }
        }
        const reactApp = ReactApp(this.viewModel);
        root.render(reactApp);

        // Adjust Safe Area.
        SafeArea.getSafeAreaInsets().then((data) => {
            this.updateSafeArea(data);
        });
        SafeArea.addListener('safeAreaChanged', (data) => {
            this.updateSafeArea(data);
        });
    }

    private createObject() {
        const prefab = this.isSphere ? this.spherePrefab : this.cubePrefab;
        director.getScene().addChild(instantiate(prefab));
    }

    private updateSafeArea (data: capacitorSafeArea.SafeAreaInsets): void {
        const { insets } = data;
        document.documentElement.style.setProperty(
            `--safe-area-top`, `${insets.top}px`,
        );
        document.documentElement.style.setProperty(
            `--safe-area-right`, `${insets.right}px`,
        );
        document.documentElement.style.setProperty(
            `--safe-area-bottom`, `${insets.bottom}px`,
        );
        document.documentElement.style.setProperty(
            `--safe-area-left`, `${insets.left}px`,
        );
    }

    update(deltaTime: number) {
    }

    onDestroy() {
        SafeArea.removeAllListeners().then();
    }
}
