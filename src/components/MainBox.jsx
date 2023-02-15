import Link from "next/link";

const MainBox = ({title, subtitle, url}) => {

    return(
        <div className="container">
            <h1 className="title">{title}</h1>
            <div>
                <Link href={`${url[0]}`} legacyBehavior>{subtitle[0]}</Link>
                <Link href={`${url[1]}`}>{subtitle[1]}</Link>
            </div>
            <style jsx>{`
                .container {
                    border: 5px solid red;
                    color: red;
                    margin: 0px 10px;
                    padding: 0px 20px;
                }
                .subtitle{
                    display: flex;
                    flex-direction: column;
                    padding: 5px 0px;
                }
                a {
                    background-color: blue;
                    text-decoration: none;
                }
               
            `}</style>
        </div>
    );
}

export default MainBox;