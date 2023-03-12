import RedTitle from "@/components/RedTitle";
import { useState, useRef} from 'react';
import { getAPI, postAPI } from '@/utils/fetch';
import axios from "axios";
import { Router, useRouter } from 'next/router';

export default function checkOut() {
    const router = useRouter();
    const userInput = useRef();
    const bookInput = useRef();
    const [id, setId] = useState();
    const [user, setUser] = useState({
        name: "",
        phone: ""
    });
    const [book, setBook] = useState([]);

    const selectUser = () => {
        setId(userInput.current.value);
        userInput.current.value = "";
    }
    const showUser = async() => {
        let response = await getAPI(`/api/user?id=${id}`);
        setUser({
            name: response.data.name,
        })
    }

    const selectBook = async() => {
        let bookId = bookInput.current.value;
        let response = await getAPI(`/api/bookinfo?id=${bookId}`);
        await setBook(e=>[...e, response.data]);

        bookInput.current.value = "";
    }
    const checkIn = async() => {
        console.log(book);
        book.map(e => {
            axios.post("/api/book/return", {
                userId: id,
                bookId: e.id
            }).then(response => {
                console.log(response.data);
            });
        })
        //router.reload();
    }

    return(
        <div>
            <h1>반납하기</h1>
            <div className="container">
                <div onClick={()=> router.replace("/manage")} className="back"> X </div>
                <div className="inputID">
                    <div>
                        <span>유저 ID</span>
                        <input ref={userInput}></input>
                        <button onClick={selectUser}>선택하기</button>
                    </div>
                    <div>
                        <span>책 ID</span>
                        <input ref={bookInput}></input>
                        <button onClick={selectBook}>선택하기</button>
                    </div>
                    <button onClick={showUser} className="savebtn">저장하기</button>
                </div>
                <div>
                    <h3>회원 정보</h3>
                    <div>회원이름: {user.name}</div>
                    <div>전화번호: {user.phone}</div>
                </div>
                <div>
                    <h3>반납 현황</h3>
                    {book.map((book, id) => {
                        return <div key={id}>{id+1} {book.bookName} {book.writer} </div>
                    })}
                </div>
                <button onClick={checkIn} className="return">반납하기</button>
            </div>
            <style jsx>{`
                .back {
                    display: flex;
                    flex-direction: row-reverse;
                    font-weight: 800;
                    cursor: pointer;
                    width: 100%;
                    margin: 10px auto;
                    margin-left: -10px;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    margin: 0px auto;
                    border: 3px solid red;
                    width: 90%;
                    padding-left: 20px;
                }
                input {
                    height: 20px;
                    border: 2px solid #2F4858;
                    margin: 5px 10px;
                }
                span {
                    font-weight: 600;
                    font-size: 18px;
                }
                button {
                    background-color: #2F4858;
                    color: white;
                    font-size: 16px;
                    margin-right: 20px;
                }
                .savebtn{
                    background-color: gray;
                    color: white;
                    font-size: 14px;
                    width: 70px;
                    height: 25px;
                }
                .inputID {
                    padding: 10px 0px;
                    display: flex;
                    align-items: center;
                }
                .return {
                    background-color: #2F4858;
                    width: 50%;
                    margin: 10px auto;
                }
            `}</style>
        </div>
    );
}