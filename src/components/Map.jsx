import {useRef, useEffect} from 'react';

export default function Map({points,map}) {
    const mapRef = useRef(null);
    useEffect(() => {
        const canvas = mapRef.current;
        canvas.width = window.innerWidth - 20;
        canvas.height = canvas.width*3/4;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);

        let px = canvas.width/120;
        let py = canvas.height/90;
        ctx.fillStyle = "black";
        map.forEach(e=>{
            ctx.fillRect(e.positionX*px, e.positionY*py, e.width*px, e.height*py);
        });

    }, [map]);

    return(
        <>
        <canvas className="map" ref={mapRef}/>
        <style jsx>{`
                .map {
                    border: 1px solid black;
                    margin: 10px 0px;
                }
        `}</style>
        </>
    );
}