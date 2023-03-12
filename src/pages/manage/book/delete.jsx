import RedTitle from "@/components/RedTitle";
import DeleteBook from "@/components/DeleteBook";
import { useRouter } from 'next/router';

export default function addBook() {
    const router = useRouter();

    return(
        <div>
            <h1>기존 도서 관리하기</h1>
            <div className="contents">
                <div className="box">
                    <div className="main">
                        <div className="title">
                            <RedTitle title="도서 삭제하기" />
                            <div onClick={()=> router.back()}> X </div>
                        </div>
                        <div className="contents">
                            <div>
                                <DeleteBook />
                            </div>
                        </div>
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
                    position: absolute;
                    border: 3px solid red;
                    width: 95%;
                    height: 95%;
                    background-color: white;
                }
                .title {
                    display: flex;
                    justify-content: space-between;
                }
                .title > div{
                    padding: 10px;
                    font-weight: 800;
                    cursor: pointer;
                }
                .contents {
                    display: flex;
                    justify-content: center;
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
            `}</style>
        </div>
        
    );
}