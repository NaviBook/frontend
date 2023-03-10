import { useRouter } from 'next/router';

const SearchResult = ({ result, onClick, selectLink}) => {
    const router = useRouter();
    const select = (id) => () => {
        onClick();
        
        router.push(`${selectLink}/${id}`);
    };

    return (
        <div className="list">
            {result.map((e, i) => {
                return (
                    <div key={i + 1} onClick={select(e.id)} className="book">
                        <div className='title'>{e.bookName}</div>
                        <div className='writer'>{e.writer}</div>
                    </div>
                );
            })}
            <style jsx>{`
                .list{
                    max-height: calc(80vh - 200px);
                    position: absolute;
                    overflow-y: overlay;
                    top: 18px;
                    background-color: white;
                    z-index:100;
                }
                .book{
                    border: 1px solid #000;
                    margin-bottom: 5px;
                    width: 200px;
                    cursor: pointer;
                }
                .title{
                    font-weight: bold;
                }
                .title, .writer {
                    margin-left: 5px;
                }
            `}</style>
        </div>
    );
};

export default SearchResult;