export default function Mainmap() {
    return(
        <div className="container">
            <div className="floor">
                <button>1층</button>
                <button>2층</button>
                <button>3층</button>        
            </div>
            <div className="map">대충 지도</div>
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                }
                .floor {
                    display: flex;
                    width: 200px;
                    justify-content: space-evenly;
                }
                .map {
                    display: flex;
                    width: 200px;
                    height: 150px;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid black;
                    margin: 10px 0px;
                }
            `}</style>
        </div>
    );
}