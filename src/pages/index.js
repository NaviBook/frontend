import LogInBtn from "@/components/LogInBtn";
import ManagerBtn from "@/components/ManagerBtn";
import SearchBar from "@/components/SearchBar";
import Mainmap from "@/components/MapContainer";
import {getAPI} from "@/utils/fetch";

export default function Home({map}) {
  return (
    <>
        <div className="btn">
            <LogInBtn />
            <ManagerBtn />
        </div>
        <div>
            <h1>NAVIBOOK</h1>
            <SearchBar />
        </div>
        <Mainmap map={map}/>
        <style jsx>{`
            .btn {
                display: flex;
                flex-direction: row-reverse;
            }
            h1 {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
            }
        `}</style>
    </>
  );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            map: await(await getAPI("http://15.165.230.7:8080/api/bookshelf")).data
        },
    };
};