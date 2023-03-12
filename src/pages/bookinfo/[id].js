
import SearchBar from "@/components/SearchBar";
import {getAPI} from "@/utils/fetch";
import Link from "next/link";
import MapContainer from "@/components/MapContainer";
import ManagerBtn from "@/components/ManagerBtn";

export default function Detail({bookInfo, map, points}) {
  return (
    <div>
        <div className="header">   
            <h3>NAVIBOOK</h3>
            <div className="btn">
                <ManagerBtn />
            </div>
        </div>
        <div className="contents">
            <Link href="/" legacyBehavior>
                <a><h1>NAVIBOOK</h1></a>
            </Link>
            <SearchBar />
        </div>
        <h1>{bookInfo.bookName} {bookInfo.writer}</h1>
        <MapContainer map={map} points={points} initfloor={points[0]?.libraryFloor}/>
        <style jsx>{`
            .header {
                background-color: red;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
            }
            .header > h3 {
                padding-left: 20px;
                color: white;
            }
            .btn {
                display: flex;
                padding-right: 20px;
            }
            .contents {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-top: 60px;
            }     
            a {
                text-decoration: none;
                color: black;
            }
            h1 {
                color: #2F4858;
            }
        `}</style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            bookInfo: await(await getAPI("http://localhost:3000/api/bookinfo?id=" + context.params.id)).data,
            map: await(await getAPI("http://localhost:3000/api/bookshelf")).data,
            points: await(await getAPI("http://localhost:3000/api/book/"+context.params.id))
                    .data
                    .filter(e=>e.status)
                    .map(e=>{
                        return {
                            bookShelfId:e.bookShelf.id,
                            libraryFloor: e.bookShelf.libraryFloor,
                            selfFloor:e.selfFloor
                        }
                    })
        }
    };
};