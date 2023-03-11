import Link from "next/link";

export default function LogInBtn() {
  return(
    <div className="container">
        <Link href="/login" legacyBehavior>
            <a>로그인</a>
        </Link>
        <style jsx>{`
            .container {
            height: 40px;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            padding: 0px 20px 0px 10px;
            }
            
            a {
            text-decoration: none;
            color: red;
            font-weight: 600;
            padding: 3px 10px;
            background-color: white;
            border-radius: 15px;
            }
        `}</style>
    </div>
  );
}