import React from 'react';
import '../../style/Input.css'
const Input = (props) => {
    return (
        <input onChange={props.onChange} value={props.value} style={props.style} className={'input'} type={props.type} placeholder={props.placeholder}/>
    );
};

export default Input;