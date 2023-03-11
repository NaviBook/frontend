import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { getAPI } from "@/utils/fetch";

function pagetest() {
    const [content, setContent] = useState([]);
    const limit = 10;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;


    async function handleLog() {
        const result = await(await getAPI("/api/record?orderBy=book")).data;
        setContent(result.recordDto.map(e=>e));
        console.log(result);
    }

    useEffect(() => {
        handleLog();
    },[])

    return(
        <>
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