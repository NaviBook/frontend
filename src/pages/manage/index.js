import MainBox from "@/components/MainBox";
import Link from "next/link";

export default function manager() {


    const menuInfo = [
        ["►  도서관리", "►  책장관리"],
        ["►  대출하기", "►  반납하기"],
        ["►  도서기록", ]
    ]

    const urlInfo = [
        ["/manage/book", "/manage/bookShelf"],
        ["/manage/checkIn", "/manage/checkOut"],
        ["manage/record"]
    ]
    
    return(
        <div >
            <h1>관리자 페이지입니다.</h1>
            <div className="menu">
                <MainBox title={"도서관 관리하기"} subtitle={menuInfo[0]} url={urlInfo[0]} />
                <MainBox title={"대출/반납하기"} subtitle={menuInfo[1]} url={urlInfo[1]} />
                <MainBox title={"목록 조회하기"} subtitle={menuInfo[2]} url={urlInfo[2]} />

            </div>
            <style jsx>{`
                .menu {
                    display: flex;
                    justify-content: center;
                    height: 300px;
                }
            `}</style>
        </div>
    );
}