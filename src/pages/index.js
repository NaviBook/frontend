import LogInBtn from "@/components/LogInBtn";
import ManagerBtn from "@/components/ManagerBtn";
import SearchBar from "@/components/SearchBar";
import Mainmap from "@/components/MapContainer";
import {getAPI} from "@/utils/fetch";
import Link from "next/link";

export default function Home({map}) {
  return (
    <div className="container">
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
        <Mainmap map={map}/>
        <style jsx>{`
            .container {
                width: 100%;
            }
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
            h1 {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
                color: #2F4858;
            }
            a {
                text-decoration: none;
            }
        `}</style>
    </div>
  );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            map: await(await getAPI("http://localhost:3000/api/bookshelf")).data
        },
    };
};