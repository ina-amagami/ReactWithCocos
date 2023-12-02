import React from "react";
const { useState } = React;
// import Toggle from './Toggle';

export const ReactApp = () => {
    return (
        <div>
            <h1 className="test">Hello React</h1>
            <button className="test-button">Click!</button>
            <Toggle />
        </div>
    );
};

interface IToggleProps {}
interface IToggleState {
    isToggleOn: boolean;
}

export class Toggle extends React.Component<IToggleProps, IToggleState> {
    state = { isToggleOn: true };

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button className="test-toggle" onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}