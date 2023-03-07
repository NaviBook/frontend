import RedTitle from "@/components/RedTitle";
import PaginateBtn from "@/components/paginateBtn";
import { useEffect, useState } from "react";
import { getAPI } from "@/utils/fetch";
export default function record(result) {
    const record = [];
    record.push(result.result);
    
    return(
        <div>
            {JSON.stringify(record)}
            {/* {record((record, i) => {
                return <div key={i}> {record.book.bookInfo.bookName} {record.book.bookInfo.writer} {record.user.name} {record.giveDate} {record.takeDate}</div>
            })} */}
        </div>
    );
}
