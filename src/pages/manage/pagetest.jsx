import { useEffect, useState } from "react";
import { getAPI } from "@/utils/fetch";

function pagetest() {
    const [content, setContent] = useState([]);

    async function handleLog() {
        const result = await(await getAPI("/api/record?page=" + curPage + "&orderBy=book")).data;
        setContent(result.recordDto);
    }

    useEffect(() => {
        handleLog();
    },[])


    return(
        <div>
            {content}
        
        </div>
    );
}

export default pagetest;