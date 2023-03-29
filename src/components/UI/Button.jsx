import React from 'react';
import '../../style/Button.css'
const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={'button'}
            style={props.style}
            disabled={props.disabled === true}
        >
            {props.children}
        </button>
    );
};

export default Button;