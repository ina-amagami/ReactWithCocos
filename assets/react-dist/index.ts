import React from "react";
import { Toggle } from './Toggle';
export const ReactApp = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "test-head"
  }, "Hello React.js with Cocos!"), /*#__PURE__*/React.createElement(Toggle, props.toggleVM), /*#__PURE__*/React.createElement("button", {
    className: "test-button",
    onClick: props.onClickButton
  }, props.buttonText));
};