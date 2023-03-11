import axios from 'axios';
import { useState, useRef } from 'react';

export default function AddBook() {
    const nameRef = useRef();
    const writerRef = useRef();
    const [value, setValue] = useState({
        name: "",
        writer: ""
    });

    const handleInput = async () => {
        setValue({name: nameRef.current.value, writer: writerRef.current.value});

        nameRef.current.value = "";
        writerRef.current.value = "";
    }

    const saveHandler = () => {
        axios.post("/api/bookinfo/add", {
            bookName: value.name,
            writer: value.writer
        }).then(response => {
            console.log(response.data);
        })
    }

    return(
        <div className="container">
            <div>
                <span>책 이름</span>
                <input ref={nameRef}></input>
            </div>
            <div>
                <span>저자</span>
                <input ref={writerRef}></input>
            </div>
            <div>
                <button onClick={handleInput}>추가하기</button>
                <button onClick={saveHandler}>완료</button>
            </div>
            
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    width: 40vw;                
                }
                .container > div {
                    padding: 3px 0px;
                }
                input {
                    width: 30vw;
                    margin-left: 10px;
                }
                button {
                    background-color: black;
                    color: white;
                }
            `}</style>
        </div>
    );
}
