import LogInBtn from "@/components/LogInBtn";
import SearchBar from "@/components/SearchBar";
import {getAPI} from "@/utils/fetch";
import Link from "next/link";
import MapContainer from "@/components/MapContainer";
import BookInfo from "@/components/BookInfo";

export default function Detail({bookInfo, map, points}) {
  return (
    <div>
        <LogInBtn />
        <div className="title">
            <Link href="/" legacyBehavior>
                <a><h3>NAVIBOOK</h3></a>
            </Link>
        </div>
        <SearchBar/>
        <BookInfo book={bookInfo}></BookInfo>
        <MapContainer map={map} points={points} initfloor={points[0].libraryFloor}/>
        <style jsx>{`
            .title {
                display: flex;
                justify-content: center;
            }     
            a {
                text-decoration: none;
                color: black;
            }
            h3 {
                width: 200px;
                margin: 5px 0px;
            }
        `}</style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
    let bookInfo = await(await getAPI("http://localhost:3000/api/book/"+context.params.id)).data;
    return {
        props: {
            bookInfo: bookInfo[0].bookInfo,
            map: await(await getAPI("http://localhost:3000/api/bookshelf")).data,
            points: bookInfo
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