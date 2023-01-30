import { useRouter } from 'next/router';

const SearchBar = ({ result }) => {
    const router = useRouter();
    const select = (id) => () => {
        router.push(`/bookinfo/${id}`);
    };

    return (
        <>
            {result.map((e, i) => {
                return (
                    <div key={i + 1} onClick={select(e.bookinfo_id)} className="book">
                        <div className='title'>{e.bookname}</div>
                        <div className='writer'>{e.writer}</div>
                    </div>
                );
            })}
            <style jsx>{`
                .book{
                    border: 1px solid #000;
                    margin: 5px;
                    width: 200px;
                }
                .title{
                    font-weight: bold;
                }
                .title, .writer {
                    margin-left: 5px;
                }
            `}</style>
        </>
    );
};

export default SearchBar;