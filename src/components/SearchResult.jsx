import { useRouter } from 'next/router';

const SearchBar = ({ result }) => {
    const router = useRouter();
    const select = (id) => () => {
        router.push(`/bookinfo/${id}`);
    };

    return (
        <div className="list">
            {result.map((e, i) => {
                return (
                    <div key={i + 1} onClick={select(e.bookinfo_id)} className="book">
                        <div className='title'>{e.bookname}</div>
                        <div className='writer'>{e.writer}</div>
                    </div>
                );
            })}
            <style jsx>{`
                .list{
                    max-height: calc(80vh - 200px);
                    position: absolute;
                    overflow-y: scroll;
                    top: 18px;
                    background-color: white;
                    z-index:100;
                }
                .book{
                    border: 1px solid #000;
                    margin-bottom: 5px;
                    width: 200px;
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

export default SearchBar;