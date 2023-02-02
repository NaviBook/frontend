import Link from "next/link";

export default function manager() {
    return(
        <div>
            <h1>관리자 페이지입니둥</h1>
            <div className="btn">
                <Link href="/manage/bookManage" legacyBehavior>
                    <a>도서 관리하기</a>
                </Link>
                <Link href="/#" legacyBehavior>
                    <a>서고 관리하기</a>
                </Link>
            </div>
            <style jsx>{`
                .btn {
                    display: flex;
                    flex-direction: column;
                }
                a {
                    padding: 30px 0px;
                }
            `}</style>
        </div>
    );
}