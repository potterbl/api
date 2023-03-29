import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './style/App.css'
import Search from "./components/Search";
import Result from "./components/Result";
import Header from "./components/Header";
function App() {
    const [data, setData] = useState([])
    const [maxPages, setMaxPages] = useState(0)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('stars')
    const [order, setOrder] = useState('desc')
    const [perPage, setPerPage] = useState(30)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=${order}&per_page=${perPage}&page=${page}`)
            .then((response) => {
                setData(response.data.items);
                const linkHeader = response.headers.link;
                if (linkHeader) {
                    const lastPageLink = linkHeader.split(",")[1];
                    const lastPageUrl = lastPageLink.match(/<(.*?)>/)[1];
                    const lastPageNumber = new URLSearchParams(lastPageUrl).get("page");
                    setMaxPages(lastPageNumber);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, [setData, query, sort, order, page, perPage, setMaxPages])

  return (
    <div className="App">
        <Header
            setData={setData}
        />
        <Search
            setMaxPages={setMaxPages}
            data={data}
            setData={setData}
            update={update}
            setUpdate={setUpdate}
            query={query}
            setQuery={setQuery}
            page={page}
            setPage={setPage}
            sort={sort}
            setSort={setSort}
            order={order}
            setOrder={setOrder}
            perPage={perPage}
            setPerPage={setPerPage}
        />
        <Result
            update={update}
            setUpdate={setUpdate}
            maxPages={maxPages}
            page={page}
            setPage={setPage}
            data={data}
        />
    </div>
  );
}

export default App;