import { useRouter, useState, useRef } from 'react';
import Modal from '@/components/Modal';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';

function bookManage() {
    const [id, setId] = useState([]);
    const inputRef = useRef();

    const handleInput = async () => {
        await setId(e=>[...e,inputRef.current.value]);
        inputRef.current.value = "";
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    const showAddBook = () => {
        setIsAdd(true);
    };

    const onClickHandler = () => {
        const book = bookRef.current.value;
        const writer = writerRef.current.value;

        axios.post("http://localhost:3000/api/bookinfo/add", {
            bookName: book,
            writer: writer
            }).then(response => {
            console.log(response.data);
        }); 
    }


    const bookRef = useRef();
    const writerRef = useRef();

    return (
        <div>
            <h1>도서 관리하기</h1>
            <div>
                <h3>step1.</h3>
                <button onClick={showModal} >도서 선택</button>
                {modalOpen && 
                (<Modal>
                    <div className="search">
                        <span>도서 검색하기</span>
                        <SearchBar selectLink="/manage/bookManage"/>
                        <button onClick={showAddBook}>도서 추가하기</button>
                        {isAdd && <Modal>
                            <div>책 이름: 
                                <input type="text" ref={bookRef}></input>
                            </div>
                            <div>저자: 
                                <input type="text" ref={writerRef}></input>
                            </div>
                            <button onClick={onClickHandler}>완료</button>
                        </Modal>}
                        <button className="close" onClick={e=>setModalOpen(false)}>닫기</button>
                    </div>
                </Modal>)}
                
            </div>
            <div>
                <h3>step2.</h3>
                <div>
                    <span>도서 ID</span>
                    <input type="text" ref={inputRef}></input>
                    <button onClick={handleInput}>입력</button>
                </div>
            </div>
            <div>
                <h3>step3.</h3>
                <div>
                    {id.map((id, i) => {
                        return <h4 key={i}>{id}</h4>
                    })}
                </div>
            </div>

        </div>
    );
}

export default bookManage;