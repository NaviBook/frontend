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
    
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    };

    const clickSave = () => {
        id.map(e => {
            axios.post("http://localhost:3000/api/book/add", {
                bookId: Number(e),
                bookInfoId: Number(bookInfo)
            }).then(response => {
                console.log(response.data);
            }); 
        })

        router.push("/manage/bookManage");
    }
    
    return (
        <div>
            <h1>도서 관리하기</h1>
            <div>
                <h3>step1.</h3>
                <button onClick={showModal} >도서 선택 완료</button>
                {modalOpen && <Modal setModalOpen={setModalOpen} />}
                <div>
                    <div className="book">
                        <div className='title'>책 이름: {result.bookName}</div>
                        <div className='writer'>저자: {result.writer}</div>
                    </div>
                </div>
            </div>
            <div>
                <h3>step2.</h3>
                <div>
                    <span>도서 ID</span>
                    <input type="number" ref={inputRef}></input>
                    <button onClick={handleInput}>입력</button>
                </div>
            </div>
            <div>
                <h3>step3.</h3>
                <div>
                    {id.map((id, i) => {
                        return <div key={i}>{result.bookName} {result.writer} {id} </div>
                    })}
                    <button onClick={clickSave}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default bookManage;

export const getServerSideProps = async (context) => {
    return {
        props: {
            bookInfo: context.params.id,
            result: await(await getAPI("http://localhost:3000/api/book/"+context.params.id))
            .data
            [0].bookInfo,
        },
    };
};