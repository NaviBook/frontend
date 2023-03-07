import RedTitle from "@/components/RedTitle";
import PaginateBtn from "@/components/paginateBtn";
import LogList from "@/components/LogList";
import { useState, useEffect } from "react";
import { getAPI } from "@/utils/fetch";
export default function record() {
    const [logs, setLogs] = useState();
    const log = [];
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        const getLogs = async () => {
            const result = await(await getAPI("/api/record?page=" + curPage + "&orderBy=book")).data;
            setLogs(result.recordDto.map(e=>e));
        };
        getLogs();
    }, []);
    
    return(
        <div>
            <RedTitle title={"대출/반납 이력 조회"}/>

            <LogList result={logs}/>
            <PaginateBtn />
        </div>
    );
}