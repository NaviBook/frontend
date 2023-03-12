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
        console.log(id);
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
            <h1>기존 도서 관리하기</h1>
            <div className="container">
                <div onClick={()=> router.replace("/manage/book")} className="back"> X </div>
                <div className="book">
                    <div>책 이름: {result.bookName}</div>
                    <div>저자: {result.writer}</div>
                    <button onClick={()=> router.back()}>변경하기</button>
                </div>
                <div className="bookID">
                    <span>도서 ID</span>
                    <input type="number" ref={inputRef}></input>
                    <button onClick={handleInput}>입력</button>
                </div>
                <div>
                    <div>
                        {id.map((id, i) => {
                            return <div key={i}>{result.bookName} {result.writer} {id} </div>
                        })}
                        <button onClick={clickSave} className="save">저장하기</button>
                    </div>
                </div>

            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    margin: 0px auto;
                    border: 3px solid red;
                    width: 90%;
                    padding-left: 20px;
                }
                .back {
                    display: flex;
                    flex-direction: row-reverse;
                    font-weight: 800;
                    cursor: pointer;
                    width: 100%;
                    margin: 10px auto;
                    margin-left: -10px;
                }
                .book {
                    display: flex;
                    padding-bottom: 20px;
                }
                .book > div {
                    padding-right: 10px;
                }
                .bookID {
                    display: flex;
                    justify-content: space-between;
                    width: 250px;
                    padding-bottom: 30px;
                }
                button {
                    background-color: #2F4858;
                    color: white;
                    margin-right: 10px;
                }
                .save {
                    background-color: red;
                }
            `}</style>
        </div>
    );
};

export default bookManage;

export const getServerSideProps = async (context) => {
    return {
        props: {
            bookInfo: context.params.id,
            result: await(await getAPI("http:/localhost:3000/api/book/"+context.params.id))
            .data
            [0].bookInfo,
        },
    };
};