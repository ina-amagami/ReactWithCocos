import React from "react";
import { Toggle } from './Toggle';
export const ReactApp = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "test-head"
  }, "Hello React.js with Cocos!"), /*#__PURE__*/React.createElement("div", {
    className: "test-button"
  }, /*#__PURE__*/React.createElement(Toggle, props.toggleVM), /*#__PURE__*/React.createElement("button", {
    onClick: () => props.onClickButton()
  }, props.buttonText)), /*#__PURE__*/React.createElement("p", {
    className: "test-input-head"
  }, "\u25BC HTML input"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "test-input"
  }), /*#__PURE__*/React.createElement("img", {
    src: props.imgUrl,
    className: "test-img",
    alt: "TestIMG"
  }));
};