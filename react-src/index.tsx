import React from "react";
import { IToggleViewModel, Toggle } from './Toggle';

export interface IAppViewModel {
    toggleVM: IToggleViewModel;
    buttonText: string;
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
            <input type="text" id="name" name="name" className="test-input" />
        </div>
    );
};
