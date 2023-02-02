import LogInBtn from "@/components/LogInBtn";
import SearchBar from "@/components/SearchBar";
import Mainmap from "@/components/MapContainer";
import {getAPI} from "@/utils/fetch";

export default function Home({map}) {
  return (
    <>
        <LogInBtn />
        <div>
            <h1>NAVIBOOK</h1>
            <SearchBar />
        </div>
        <Mainmap map={map}/>
        <style jsx>{`
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
            map: await(await getAPI("http://localhost:3000/api/bookshelf")).data
        },
    };
};