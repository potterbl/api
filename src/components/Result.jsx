import React, {useEffect, useState} from 'react';
import '../style/Result.css'
import Button from "./UI/Button";
import CardInfo from "./CardInfo";
const Result = (props) => {
    function isPageMin() {
        if(props.page <= 1 || props.data.length === 0){
            return true
        } else  {
            return false
        }
    }
    function isDataLoaded() {
        if(props.data.length === 0){
            return false
        } else  {
            return true
        }
    }
    function isMaxPage() {
        if(props.page >= props.maxPages || props.data.length === 0){
            return true
        } else {
            return false
        }
    }
    function prevPage() {
        if(props.page > 1){
            props.setPage(props.page - 1)
            isPageMin()
        }
    }
    function nextPage() {
        if(props.page < props.maxPages){
            props.setPage(props.page + 1)
            isMaxPage()
        }
    }
    let isPage = isPageMin()
    let isData = isDataLoaded()
    let isMax = isMaxPage()
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        const loading = document.querySelector('.loading');
        const card = document.querySelector('.cards')

        if(props.data.length > 0){
            props.setUpdate(false)
        }

        if (props.update === false && props.data.length > 0) {
            loading.style.display = 'none';
            card.style.display = 'grid';
        } else if(props.update === true && props.data.length === 0) {
            loading.style.display = 'flex';
            card.style.display = 'none';
        } else {
            loading.style.display = 'none';
            card.style.display = 'grid';
        }

        const moreInfo = document.querySelector('.card__wrapper')
        if(showMore){
            moreInfo.style = 'display: flex'
        } else {
            moreInfo.style = 'display: none'
        }

    }, [props.data,showMore]);
    const [chosenImage, setChosenImage] = useState('')
    const [chosenRepo, setChosenRepo] = useState('')
    const [chosenLang, setChosenLang] = useState('')
    const [chosenDesc, setChosenDesc] = useState('')
    const [chosenLink, setChosenLink] = useState('')
    const [chosenName, setChosenName] = useState('')
    function showInfo(image, repo, lang, description, link, ownerName){
        setChosenImage(image)
        setChosenRepo(repo)
        setChosenLang(lang)
        setChosenDesc(description)
        setChosenLink(link)
        setChosenName(ownerName)
        setShowMore(true)
        const info = document.querySelector('.card__info')

        setTimeout(() => {
            info.classList.add('animate')
        })
    }
    return (
        <div className={'result'}>
            <div className="result__nav">
                <div className="result__buttons">
                    <Button disabled={isPage} onClick={prevPage}>←</Button>
                    <Button disabled={isMax} onClick={nextPage}>→</Button>
                </div>
                <h1 style={{display: isData ? 'block' : 'none'}}>Page: {props.page}</h1>
            </div>
            <div className="loading" style={{display: isData ? 'none' : 'none'}}>
                <div className="loading__el" id={'el1'}></div>
                <div className="loading__el" id={'el2'}></div>
                <div className="loading__el" id={'el3'}></div>
            </div>
            <div className="cards__wrapper">
                <p id={'view__info'} style={{display: isData ? 'block' : 'none', textAlign: 'center', color: '#999999', fontSize: '18px', margin: 0}}>Tap to view more!</p>

                <div className="cards">
                    {props.data.map(dataCard => (
                        <div className="card" key={dataCard.id} onClick={() => showInfo(dataCard.owner.avatar_url, dataCard.name, dataCard.language, dataCard.description, dataCard.html_url, dataCard.owner.login)}>
                            <img src={dataCard.owner.avatar_url} alt=""/>
                            <div className="repo__name">
                                <h3>Repository name:</h3>
                                <p>{dataCard.name}</p>
                            </div>
                            <div className="language">
                                <h3>Language:</h3>
                                <p>{dataCard.language}</p>
                            </div>
                            <p className="description">{dataCard.description}</p>
                            <a href={dataCard.html_url}>{dataCard.html_url}</a>
                            <p className="author">{dataCard.owner.login}</p>
                        </div>
                    ))}
                </div>
            </div>

            <CardInfo
                image={chosenImage}
                repo={chosenRepo}
                lang={chosenLang}
                description={chosenDesc}
                link={chosenLink}
                name={chosenName}
                setShowMore={setShowMore}
            />
        </div>
    );
};

export default Result;