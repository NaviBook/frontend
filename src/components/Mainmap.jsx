import { useState} from 'react';
import Map from './Map';

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
                        <button key={i+1} onClick={selectFloor(e)}>{e}</button>
                    );
                })}
            </div>
            <Map points={points} map={map.filter(e=>e.libraryFloor === floor)}/>
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
                    border: 1px solid black;
                    margin: 10px 0px;
                }
            `}</style>
        </div>
    );
}