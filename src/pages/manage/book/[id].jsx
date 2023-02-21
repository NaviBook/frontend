import RedTitle from "@/components/RedTitle";
import { useState, useRef, useEffect } from 'react';
import Modal from '@/components/Modal';
import { getAPI, postAPI } from '@/utils/fetch';
import axios from 'axios';
import { useRouter } from 'next/router';

function bookManage({bookInfo, result}) {  
    const inputRef = useRef();
    const [id, setId] = useState([]);
    const router = useRouter();
    
    const handleInput = async () => {
        await setId(e=>[...e,inputRef.current.value]);
        inputRef.current.value = "";
    };
    
    const clickSave = () => {
        id.map(e => {
            axios.post("/api/book/add", {
                bookId: Number(e),
                bookInfoId: Number(bookInfo)
            }).then(response => {
                console.log(response.data);
            }); 
        })
        router.push("/manage/book");
    }
    
    return (
        <div>
            <RedTitle title="새로운 도서 관리하기"/>
            <div className="book">
                <div className="title">책 이름: {result.bookName}</div>
                <div className="writer">저자: {result.writer}</div>
                <button>변경하기</button>
            </div>
            <div>
                <span>도서 ID</span>
                <input type="number" ref={inputRef}></input>
                <button onClick={handleInput}>입력</button>
            </div>
            <div>
                <div>
                    {id.map((id, i) => {
                        return <div key={i}>{result.bookName} {result.writer} {id} </div>
                    })}
                    <button onClick={clickSave}>저장</button>
                </div>
            </div>
            <style jsx>{`
                
            `}</style>
        </div>
    );
};

export default bookManage;

export const getServerSideProps = async (context) => {
    return {
        props: {
            bookInfo: context.params.id,
            result: await(await getAPI("http://15.165.230.7:8080/api/book/"+context.params.id))
            .data
            [0].bookInfo,
        },
    };
};