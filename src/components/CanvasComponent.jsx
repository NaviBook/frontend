import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';

function CanvasComponent({ bookshelf, library }) {
    const [items, setItems] = useState(bookshelf);
    const [registeredItems, setRegisteredItems] = useState(library);
    
    const itemRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        let itemStage = new Konva.Stage({
            container: itemRef.current,
            width: window.innerWidth,
            height: 200,
        });
    
        let itemLayer = new Konva.Layer();
        itemStage.add(itemLayer);

        let mapStage = new Konva.Stage({
            container: mapRef.current,
            width: window.innerWidth,
            height: 400,
        });

        let mapLayer = new Konva.Layer();
        mapStage.add(mapLayer);

        let positionX = 4;
        let shelfGroups = bookshelf.map((item) => {
            let shelfGroup = new Konva.Group({
                x: positionX,
                y: 4,
                draggable: true,
                width: item.width,
                height: item.height,
            });
            
            shelfGroup.add(new Konva.Rect({
                width: item.width,
                height: item.height,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2
            }));

            shelfGroup.add(new Konva.Text({
                text: item.id,
                fontSize: 20,
                fontFamily: 'Calibri',
                fill: 'black',
            }));
            positionX+=item.width+4;
            return shelfGroup;
        });

        shelfGroups.forEach((shelfGroup) => {
            itemLayer.add(shelfGroup);
        });

        itemLayer.on('click', (e) => {
            console.log(e.target.parent);
        });

        // box.on('click', (e) => {
        //     console.log(e);
        //     // box.remove();
        //     // layer.draw();
        //     // mapLayer.add(box);
        // });



        
        document.getElementsByTagName('html')[0].style.width = '100%';
        document.getElementsByTagName('body')[0].style.maxWidth = "none";

        const handleResize = () => {
            itemStage.setWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <h2>Item Canvas</h2>
            <div
                style={{ width: '100%', height: '200px' }}
                ref={itemRef}
            />
            <h2>Map Canvas</h2>
            <div
                style={{ width: '100%', height: '400px' }}
                ref={mapRef}
            />
        </div>
    );
}

export default CanvasComponent;