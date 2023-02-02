import Link from "next/link";

export default function LogInBtn() {
  return(
    <div className="container">
        <Link href="/login" legacyBehavior>
            <a>로그인</a>
        </Link>
        <style jsx>{`
            .container {
            height: 60px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            padding: 0px 20px 0px 10px;
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