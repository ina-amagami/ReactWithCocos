import React from "react";
const { useState } = React;
import { IToggleViewModel, Toggle } from './Toggle';

export interface IAppViewModel {
    toggleVM: IToggleViewModel;
    onClickButton: () => void;
}

export const ReactApp: React.FC<IAppViewModel> = (props) => {
    return (
        <div>
            <h1 className="test">Hello React</h1>
            <Toggle {...props.toggleVM} />
            <button className="test-button" onClick={() => props.onClickButton()}>Click!</button>
        </div>
    );
};
