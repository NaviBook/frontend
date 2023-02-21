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
            axios.post("/api/book/borrow", {
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
            <RedTitle title="반납하기"/>
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
            <button onClick={showUser}>왜 안돼?</button>
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
            <button onClick={checkIn}>반납하기</button>
        </div>
    );
}