import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { getAPI } from "@/utils/fetch";

function pagetest() {
    const [content, setContent] = useState([]);
    const limit = 10;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [sortType, setSortType] = useState();

    async function handleLog() {
        const result = await(await getAPI("/api/record?orderBy="+sortType)).data;
        setContent(result.recordDto.map(e=>e));
        setPage(1);
        //console.log(result);
    }
    const handleType = (type) => {
        setSortType(type);
    }

    useEffect(() => {
        handleLog();
        setSortType("user");
    },[]);

    return(
        <>
            <label>
                <button onClick={() => {handleType("user"); handleLog();
                }}>대출자</button>
                <button onClick={() => {handleType("book"); handleLog();
                }}>제목</button>
                <button onClick={() => {handleType("takeDate"); handleLog();
                }}>대출 날짜</button>
                <button onClick={() => {handleType("giveDate"); handleLog();
                }}>반납 날짜</button>
                <button>미 반납</button>
            </label>
            {content.slice(offset, offset + limit).map(({ id, book, user, takeDate, giveDate }) => (
                <article key={id}>
                    <p> {book.bookInfo.bookName} {user.name} {takeDate} {giveDate} </p>
                </article>
            ))}
            <Pagination 
                total={content.length}
                limit={limit}
                page={page}
                setPage={setPage} />
        </>
    );
}

export default pagetest;