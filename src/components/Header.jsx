import React from 'react';
import '../style/Header.css'
const Header = (props) => {
    function removeQuery() {
        props.setData([])
    }
    return (
        <div className={'header'}>
            <img onClick={removeQuery} src="https://th.bing.com/th/id/R.5cd9f30e245cbdcc11274951e439ad65?rik=c61gYEk%2bdXF7rg&pid=ImgRaw&r=0" alt=""/>
            <h1>GitHub Search open API</h1>
        </div>
    );
};

export default Header;