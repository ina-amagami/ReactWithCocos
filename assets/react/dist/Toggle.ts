import React from "react";
const {
  useState
} = React;
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