import LogInBtn from "@/components/LogInBtn";
import SearchBar from "@/components/SearchBar";
import Mainmap from "@/components/Mainmap";

export default function Home() {
  return (
    <>
        <LogInBtn />
        <div>
            <h1>NAVIBOOK</h1>
            <SearchBar />
        </div>
        <div className="map">
            <Mainmap />
        </div>
        <style jsx>{`
            h1 {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
            }
            .map {
                padding-top: 50px;
            }
        `}</style>
    </>
  );
}
