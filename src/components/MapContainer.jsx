import { useState} from 'react';
import MapCanvas from './MapCanvas';

export default function Mainmap({points,map,initfloor="1F"}) {
    const [floor, setFloor] = useState(initfloor);
    const floors = [];
    map.forEach(e=>{
        if(!floors.includes(e.libraryFloor))
            floors.push(e.libraryFloor);
    });

    const selectFloor = (floor) => () => {
        setFloor(floor);
    };

    return(
        <div className="container">
            <div className="floor">
                {floors.map((e,i)=>{
                    return(
                        <div key={i+1} onClick={selectFloor(e)} className={e==floor?"active":""}>{e}</div>
                    );
                })}
            </div>
            <MapCanvas map={map.filter(e=>e.libraryFloor === floor)} points={points}/>
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
                    justify-content: center;
                    gap: 10px;
                }
                .floor>div{
                    padding: 5px 10px;
                    background-color: #ccc;
                    font-weight: bold;
                }
                .map {
                    border: 1px solid black;
                    margin: 10px 0px;
                }
                .floor>div.active{
                    background-color: skyblue;
                    color: white;
                }
            `}</style>
        </div>
    );
}