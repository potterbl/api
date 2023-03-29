import React, {useEffect, useState} from 'react';
import '../style/Search.css'
import Button from "./UI/Button";
import Input from "./UI/Input";
const Search = (props) => {
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('update')
    const [perPage, setPerPage] = useState(30)

    function sorting(value) {
        setSort(value);
        if (value === "starsUp") {
            props.setSort("stars");
            props.setOrder("desc");
        } else if (value === "starsDown") {
            props.setSort("stars");
            props.setOrder("asc");
        } else if (value === "forksUp") {
            props.setSort("forks");
            props.setOrder("desc");
        } else if (value === "forksDown") {
            props.setSort("forks");
            props.setOrder("asc");
        } else if (value === "updatedUp") {
            props.setSort("updated");
            props.setOrder("desc");
        } else if (value === "updatedDown") {
            props.setSort("updated");
            props.setOrder("asc");
        }
    }

    function updatePerPage(e) {
        setPerPage(e.target.value)
    }
    function changeSearch() {
        props.setMaxPages(0)
        props.setQuery('')
        setTimeout(() => {
            props.setQuery(query)
            props.setPerPage(perPage)
            props.setData([])
            props.setUpdate(true)
            props.setPage(1)
        }, 0)

    }
    const [moreOrLess, setMoreOrLess] = useState(false)
    function moreQuery() {
        setMoreOrLess(!moreOrLess)
    }
    useEffect(() => {
        const additional = document.querySelector('.additional')
        const more = document.querySelector('.more')

        if(moreOrLess){
            additional.style = 'height: 100%; opacity: 1; transform: translateX(0)'
            more.textContent = 'Show less'

        } else {
            additional.style = 'height: 0; opacity: 0; transform: translateX(-100%)'
            more.textContent = 'Show more'
        }
    }, [moreOrLess])
    return (
        <div className={'search_wrapper'}>
            <div className="default__query">
                <Input
                    onChange={e => setQuery(e.target.value)}
                    style={{width: '100%'}}
                    type="text"
                    placeholder={'Введите запрос(название репозитория/описание)'}
                />
                <Button
                    onClick={changeSearch}
                >
                    Search
                </Button>
            </div>
            <p className="more" onClick={moreQuery}>Show more</p>
            <div className="additional">
                <div className="sort">
                    <p>Choose sort:</p>
                    <select className="sort" onChange={(e) => sorting(e.target.value)}>
                        <option value="starsUp">stars desc</option>
                        <option value="starsDown">stars asc</option>
                        <option value="forksUp">forks desc</option>
                        <option value="forksDown">forks asc</option>
                        <option value="updatedUp">updated desc</option>
                        <option value="updatedDown">updated asc</option>
                    </select>
                </div>
                <div className="per__page">
                    <p>Input count per page(max: 100, default: 30):</p>
                    <Input onChange={updatePerPage} type="number" value={perPage}/>
                </div>
            </div>
        </div>
    );
};

export default Search;