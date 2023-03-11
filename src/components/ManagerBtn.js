import Link from "next/link";

export default function ManagerBtn() {
  return(
    <div className="container">
        <Link href="/manage/" legacyBehavior>
            <a>관리자</a>
        </Link>
        <style jsx>{`
            .container {
            height: 40px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            }
            
            a {
            text-decoration: none;
            color: red;
            font-weight: 500;
            border-radius: 15px;
            padding: 3px 10px;
            background-color: white;
            }
        `}</style>
    </div>
  );
}