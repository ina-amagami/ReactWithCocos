import React from "react";
const {
  useState
} = React;
import { Toggle } from './Toggle';
export const ReactApp = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "test"
  }, "Hello React"), /*#__PURE__*/React.createElement(Toggle, props.toggleVM), /*#__PURE__*/React.createElement("button", {
    className: "test-button",
    onClick: () => props.onClickButton()
  }, "Click!"));
};