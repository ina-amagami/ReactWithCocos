import React from "react";
const { useState } = React;
// import Toggle from './Toggle';

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

export interface IToggleViewModel {
    defaultValue: boolean;
    offText: string;
    onText: string;
    onToggleChange: (x: boolean) => void;
}

export const Toggle: React.FC<IToggleViewModel> = (props) => {
    const [isToggleOn, setIsToggleOn]
        = useState(props.defaultValue)

    const toggleValue = (prevValue: boolean) => {
        const newValue = !prevValue;
        props.onToggleChange(newValue);
        return newValue;
    };

    return (
        <button className="test-toggle" onClick={() => setIsToggleOn(toggleValue)}>
            { isToggleOn ? props.onText : props.offText }
        </button>
    );
}

// export class Toggle extends React.Component<IToggleProps, IToggleState> {
//     state = { isToggleOn: true };
//
//     handleClick = () => {
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }));
//     }
//
//     render() {
//     }
// }