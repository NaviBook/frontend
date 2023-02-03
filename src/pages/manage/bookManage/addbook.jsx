import { useRouter, useState, useRef } from 'react';
import Modal from '@/components/Modal';
import SearchBar from '@/components/SearchBar'

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
        setIsAdd(!isAdd);
    };

    return (
        <div>
            <h1>도서 추가하기</h1>
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
                            <div>책 이름: <input></input></div>
                            <div>저자: <input></input></div>
                            <button onClick={showAddBook}>완료</button>
                        </Modal>}
                        <button className="close" onClick={e=>setModalOpen(false)}>닫기</button>
                    </div>
                </Modal>)}
                
            </div>
            
        </div>
    );
}

export default bookManage;