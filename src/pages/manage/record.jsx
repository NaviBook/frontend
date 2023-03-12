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
            <h1>기록 조회하기</h1>
            <div className="sortType">
                <p>정렬하기</p>
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
            </div>
            <div className="list">
                <div className="listName">책제목 | 대출자 | 대출날짜 | 반납날짜</div>
                {content.slice(offset, offset + limit).map(({ id, book, user, takeDate, giveDate }) => (
                    <article key={id}>
                        <p> {book.bookInfo.bookName} | {user.name} | {takeDate} | {giveDate} </p>
                    </article>
                ))}
            </div>
            <div className="page">
                <Pagination 
                    total={content.length}
                    limit={limit}
                    page={page}
                    setPage={setPage} />
            </div>
            <style jsx>{`
               button {
                   border-radius: 0px;
                   border: 0px solid;
                   margin-left: 5px;
               }
               .sortType {
                   display: flex;
                   align-items: center;
                   justify-content: flex-end;
                   width: 60%;
                   margin: 0px auto;
               }
               .list {
                   display: flex;
                   flex-direction: column;
                   width: 60%;
                   margin: 0px auto;
               }
               .listName {
                   border-bottom: 1px solid rgba(0,0,0, 0.3);
                   padding-bottom: 10px;
               }
               .page {
                   display: flex;
                   justify-content: center;
               }
            `}</style>
        </>
    );
}

export default pagetest;