import React from 'react';
import '../style/CardInfo.css'
const CardInfo = (props) => {
    const handleClick = (event) => {
        event.stopPropagation();
    }
    function animateInfo() {
        const info = document.querySelector('.card__info')

        info.classList.remove('animate')
        setTimeout(() => {
            props.setShowMore(false)
        }, 300)
    }
    return (
        <div className={'card__wrapper'} onClick={animateInfo}>
            <div className="card__info" onClick={handleClick}>
                <img src={props.image} alt=""/>
                <div className="info__inner">
                    <h2>Repository name: {props.repo}</h2>
                    <h3>Language: {props.lang}</h3>
                    <p>{props.description}</p>
                    <a href={props.link}>{props.link}</a>
                    <h3>Author: {props.name}</h3>
                </div>
                <button onClick={animateInfo}>+</button>
            </div>
        </div>
    );
};

export default CardInfo;