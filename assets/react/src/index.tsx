import React from "react";
import { IToggleViewModel, Toggle } from './Toggle';

export interface IAppViewModel {
    toggleVM: IToggleViewModel;
    buttonText: string;
    imgUrl: string;
    onClickButton: () => void;
}

export const ReactApp: React.FC<IAppViewModel> = (props) => {
    return (
        <div>
            <h1 className="test-head">Hello React.js with Cocos!</h1>
            <div className="test-button">
                <Toggle {...props.toggleVM} />
                <button onClick={() => props.onClickButton()}>{props.buttonText}</button>
            </div>
            <p className="test-input-head">▼ HTML input</p>
            <input type="text" className="test-input" />
            <img src={props.imgUrl} className="test-img" alt="TestIMG" />
        </div>
    );
};
