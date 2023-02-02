import { useRouter, useState, useRef } from 'react';

function bookManage() {
    
    const inputRef = useRef();
    const [id, setId] = useState([]);

    const handleInput = async () => {
        await setId(e=>[...e,inputRef.current.value]);
        inputRef.current.value = "";
    };


    return (
        <div>
            <h1>도서 관리하기</h1>
            <div>
                <h3>step1.</h3>
                <button>도서 선택</button>
                <div>
                    <div className='title'>{}</div>
                    <div className='writer'>{}</div>
                </div>
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