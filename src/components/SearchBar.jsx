import {useState,useEffect,useRef} from 'react';
import SearchResult from './SearchResult';
import {getAPI, postAPI} from '@/utils/fetch';

const SearchBar = ({selectLink="/bookinfo"}) => {
    const inputRef = useRef(null);
    let [result, setResult] = useState([]);
    const search = async () => {
        let value = inputRef.current.value;
        if (value.length > 0) {
            let result = [];
            let response = await getAPI(`/api/bookinfo/${value}`);
            if (response.status === 200) {
                result = response.data;
            }
            setResult(result);
        } else {
            setResult([]);
        }
    };
    
    let [recommend, setRecommend] = useState([]);
    useEffect(() => {
        const getRecommend = async () => {
            let response = await getAPI(`/api/bookinfo/random/4`);
            if (response.status === 200) {
                setRecommend(response.data.map(e=>e.bookName));
            }

        };
        getRecommend();
    },[]);

    const clickRecommend = (bookName) => () => {
        inputRef.current.value = bookName;
        search();
    };

    return (
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Search" onChange={search} ref={inputRef}/>
                <button><img src="/search.svg" /></button>
            </div>
            <div className="recommend">
                {recommend.map((e,i) => {
                    return (
                    <span key={i+1} onClick={clickRecommend(e)}>
                        {e}
                    </span>
                    );
                })}
            </div>
            <SearchResult result={result} onClick={clickRecommend("")} selectLink={selectLink}/>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position:relative;
                }
                .recommend>span{
                    margin: 5px;
                    color: skyblue;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .search {
                    display: flex;
                    width: 200px;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid black;
                    border-radius: 3px;
                }
                .search>button, img {
                    display: flex;
                    width: 20px;
                    height: 20px;
                    justify-content: center;
                    align-items: center;
                }
                .search>input, button {
                    border: none;
                    background-color: white;
                }
                .search>input {
                    width: 180px;
                }

            `}</style>
        </ div>
    );
}

export default SearchBar;