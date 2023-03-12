import {useRef, useEffect} from 'react';

export default function Map({points=null,map}) {
    const mapRef = useRef(null);
    const resizeCanvas = () => {
        const canvas = mapRef.current;
        canvas.width = window.innerWidth - 20;
        canvas.height = canvas.width*3/4;
    }
    const drawMap = () => {
        const canvas = mapRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width,canvas.height);

        let px = canvas.width/120;
        let py = canvas.height/90;
        ctx.fillStyle = "#888";
        console.log(map,points);
        map.forEach(e=>{
            if(points?.map(e=>e.bookShelfId).includes(e.id)) {
                ctx.fillStyle = "#AD7D5A";
                ctx.fillRect(e.positionX*px, e.positionY*py, e.width*px, e.height*py);
                ctx.fillStyle = "#fff";
                let fontSize = e.width*px/2;
                ctx.font = `${fontSize}px Noto Sans`;
                ctx.fillText(points.filter(f=>f.bookShelfId==e.id)[0].selfFloor+"층", (e.positionX+1)*px, e.positionY*py+10+fontSize);
                ctx.fillText(points.filter(f=>f.bookShelfId==e.id).length + "권", (e.positionX+1)*px, e.positionY*py+10+fontSize*2);
            } else {
                ctx.fillStyle = "#ccc";
                ctx.fillRect(e.positionX*px, e.positionY*py, e.width*px, e.height*py);
            }
        });
    }
    useEffect(() => {
        resizeCanvas();
        drawMap();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('resize', drawMap);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('resize', drawMap);
        }
    }, []);

    useEffect(drawMap, [map]);

    return(
        <>
        <canvas className="map" ref={mapRef}/>
        <style jsx>{`
                .map {
                    border: 2px solid #2F4858;
                    margin: 10px 0px;
                }
        `}</style>
        </>
    );
}