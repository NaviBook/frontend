import { useState, useRef } from 'react';
import axios from 'axios';
import Modal from '@/components/Modal';

const bookManage = () => {
    const [modalOpen, setModalOpen] = useState(false);


    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div>
            <h1>도서 관리하기</h1>
            <div>
                <h3>step1.</h3>
                <button onClick={showModal} >도서 선택</button>
                {modalOpen && <Modal setModalOpen={setModalOpen} />}
                
            </div>

        </div>
    );
}

export default bookManage;