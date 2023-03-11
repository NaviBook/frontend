import LogInBtn from "@/components/LogInBtn";
import SearchBar from "@/components/SearchBar";
import {getAPI} from "@/utils/fetch";
import Link from "next/link";
import MapContainer from "@/components/MapContainer";

export default function Detail({bookInfoId, bookName, map, points}) {
  return (
    <div>
        <LogInBtn />
        <div className="title">
            <Link href="/" legacyBehavior>
                <a><h3>NAVIBOOK</h3></a>
            </Link>
        </div>
        <SearchBar/>
        <h1>Detail {bookInfoId}</h1>
        <h1>{bookName}</h1>
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
    return {
        props: {
            bookInfoId: context.params.id,
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