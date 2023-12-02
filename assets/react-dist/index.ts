import React from "react";
const {
  useState
} = React;
// import Toggle from './Toggle';

export const ReactApp = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "test"
  }, "Hello React"), /*#__PURE__*/React.createElement("button", {
    className: "test-button"
  }, "Click!"), /*#__PURE__*/React.createElement(Toggle, null));
};
export class Toggle extends React.Component {
  state = {
    isToggleOn: true
  };
  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  };
  render() {
    return /*#__PURE__*/React.createElement("button", {
      className: "test-toggle",
      onClick: this.handleClick
    }, this.state.isToggleOn ? 'ON' : 'OFF');
  }
}
