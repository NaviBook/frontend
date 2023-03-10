import RedTitle from "@/components/RedTitle";
import SearchBar from "@/components/SearchBar";
import { useRouter } from 'next/router';

function bookManage() {
    const router = useRouter();

    return (
        <div>
            <h1>기존 도서 관리하기</h1>
            <div className="contents">
                <div className="box">
                    <div className="main">
                        <div className="searchTitle">
                            <RedTitle title="도서 검색하기" />
                            <div onClick={()=> router.replace("/manage")}> X </div>
                        </div>
                        <div className="searchBar">
                            <SearchBar selectLink="/manage/book"/>
                        </div>
                        <div className="btn" onClick={() => router.push("/manage/book/add")}> 새로운 도서 추가하기</div>
                        <div className="btn" onClick={() => router.push("/manage/book/delete")}> 도서 삭제하기</div>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
            <style jsx>{`
                .contents {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 10px;
                }
                .box {
                    position: relative;
                    left: 10px;
                    width: 60vw;
                    height: 35vw;
                }
                .main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: absolute;
                    border: 3px solid red;
                    width: 95%;
                    height: 95%;
                    background-color: white;
                }
                .main > div {
                    display: flex;
                    justify-content: space-between;
                }
                .main > div > div{
                    padding: 10px;
                    font-weight: 800;
                    cursor: pointer;
                }
                .back {
                    position: absolute;
                    left: -10px;
                    top: -10px;
                    border: 3px solid red;
                    width: 95%;
                    height: 95%;
                    z-index: -10;
                }
                .btn {
                    background-color: red;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
                .searchTitle {
                    width: 100%;
                }
                .searchBar {
                    padding: 50px 0px 150px 0px;
                }
               
            `}</style>
        </div>
    );
}

export default bookManage;