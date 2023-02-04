const BookInfo = ({ book }) => {
    return (
        <div className="book-info">
            <div className="title">{book.bookName}</div>
            <div className="writer">{book.writer}</div>
            <style jsx>{`
                .book-info{
                    border: 1px solid #000;
                    margin-bottom: 5px;
                    width: 200px;
                    margin: auto;
                }
                .title{
                    font-weight: bold;
                }
                .title, .writer{
                    margin-left: 5px;
                }
            `}</style>
        </div>
    );
}

export default BookInfo;