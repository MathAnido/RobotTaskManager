import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <button
      className="button6"
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  );
};

export default Button;
