import Link from "next/link";

const MainBox = ({title, subtitle, url}) => {

    return(
        <div className="container">
            <h1 className="title">{title}</h1>
            <div className="subtitle">
                <Link href={`${url[0]}`} legacyBehavior>
                    <a><h3> {subtitle[0]}</h3></a>
                </Link>
                <Link href={`${url[1]}`} legacyBehavior>
                    <a><h3> {subtitle[1]}</h3></a>
                </Link>
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
                    text-decoration: none;
                    color: red;
                    padding: 0px;
                    margin: 0px;
                }
                h3 {
                    padding: 0px;
                    margin: 10px 0px;
                }
                a:hover {
                    color: #2F4858;
                }
               
            `}</style>
        </div>
    );
}

export default MainBox;