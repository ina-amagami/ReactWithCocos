import React from "react";
const {
  useState
} = React;
// import Toggle from './Toggle';

export const ReactApp = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "test"
  }, "Hello React"), /*#__PURE__*/React.createElement(Toggle, props.toggleVM), /*#__PURE__*/React.createElement("button", {
    className: "test-button",
    onClick: () => props.onClickButton()
  }, "Click!"));
};
export const Toggle = props => {
  const [isToggleOn, setIsToggleOn] = useState(props.defaultValue);
  const toggleValue = prevValue => {
    const newValue = !prevValue;
    props.onToggleChange(newValue);
    return newValue;
  };
  return /*#__PURE__*/React.createElement("button", {
    className: "test-toggle",
    onClick: () => setIsToggleOn(toggleValue)
  }, isToggleOn ? props.onText : props.offText);
};

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
