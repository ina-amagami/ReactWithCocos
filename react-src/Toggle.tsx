import React from "react";
const { useState } = React;

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