import LogInBtn from "@/components/LogInBtn";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default function Detail({id}) {
  return (
    <div>
        <LogInBtn />
        <div className="title">
            <Link href="/" legacyBehavior>
                <a><h3>NAVIBOOK</h3></a>
            </Link>
        </div>
        <SearchBar/>
        <h1>Detail {id}</h1>
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
            id: context.params.id,
        },
    };
};