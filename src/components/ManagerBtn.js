import Link from "next/link";

export default function ManagerBtn() {
  return(
    <div className="container">
        <Link href="/manage/" legacyBehavior>
            <a>관리자</a>
        </Link>
        <style jsx>{`
            .container {
            height: 60px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            }
            
            a {
            text-decoration: none;
            color: black;
            border: 1px solid black;
            padding: 5px 10px;
            }
        `}</style>
    </div>
  );
}