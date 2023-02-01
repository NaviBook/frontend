
export default function SearchBox() {
  return(
    <div className="container">
        <h1>NAVIBOOK</h1>
        <div className="search">
            <input></input>
            <img src="/search.svg" />
        </div>
        <div className="keyword">
          대충 추천 검색어
        </div>
        <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            h1 {
                margin-bottom: 10px;
            }
            .search {
                display: flex;
            }
            img {
                width: 20px;
                height: 20px;
                padding-left: 5px;
            }
            .keyword  {
                margin: 10px 0px;
            }
        `}</style>
    </div>
  );
}