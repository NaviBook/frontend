import SearchBarAJ from "@/components/SearchBarAJ";

const Modal = ({setModalOpen}) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    return(
        <div className="container">
            <div className="search">
                <span>도서 검색하기</span>
                <SearchBarAJ />
            </div>
            <button className="close" onClick={closeModal}>닫기</button>
            <style jsx>{`
                .container {
                    background-color: gray;
                    height: 300px;
                }
                .search {
                    display: flex;
                }
                .close {
                    
                }
            `}</style>
        </div>
    );
}

export default Modal;