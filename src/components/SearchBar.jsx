import {useState,useEffect,useRef} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchBar = () => {
    const inputRef = useRef(null);
    let [result, setResult] = useState([]);
    const router = useRouter();
    const search = async (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            let result = [];
            let response = await axios.get(`/api/bookinfo/searchbookinfo`,{params:{bookname: value}});
            if (response.status === 200) {
                result = response.data;
            }
            setResult(result);
        } else {
            setResult([]);
        }
    };

    const select = (id) => () => {
        router.push(`/bookinfo/${id}`);
    };
    
    let [recommend, setRecommend] = useState([]);
    useEffect(() => {
        const getRecommend = async () => {
            //let response = await axios.get(`/api/bookinfo/randombookinfo`,{params:{cnt: 4}});
            let response = {status:200,data:["A2","A12","A20","3"]};
            if (response.status === 200) {
                setRecommend(response.data);
            }
        };
        getRecommend();
    },[]);

    const clickRecommend = (bookname) => () => {
        inputRef.current.value = bookname;
        search({target: inputRef.current});
    };

    return (
        <>
            <input type="text" placeholder="Search" onChange={search} ref={inputRef}/>
            <button>Search</button>
            <div className="recommend">
                {recommend.map((e,i) => {
                    return (
                    <span key={i+1} onClick={clickRecommend(e)}>
                        {e}
                    </span>
                    );
                })}
            </div>
            <div className="result">
                {result.map((e,i) => {
                    return (
                    <div key={i+1} onClick={select(e.bookinfo_id)}>
                        <div className='title'>{e.bookname}</div>
                        <div className='writer'>{e.writer}</div>
                    </div>
                    );
                })}
            </div>
            <style jsx>{`
                .recommend>span{
                    margin: 5px;
                    color: skyblue;
                    cursor: pointer;
                    text-decoration: underline;
                }
                .result>div{
                    border: 1px solid #000;
                    margin: 5px;
                }

            `}</style>
        </>
    );
};

export default SearchBar;