import React, { useState, useEffect, useRef } from 'react';
import Konva from 'konva';
import { getAPI, postAPI } from '@/utils/fetch';

function NumberInput({ text, unit, value, onChange, step }) {
    return (
        <div>
            <label>{text}</label>
            <button onClick={() => onChange(value - step)}>-</button>
            <div className="container">
                <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
                <span>{unit}</span>
            </div>
            <button onClick={() => onChange(value + step)}>+</button>
            <style jsx>{`
                div {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    font-family: 'Noto Sans KR';
                }
                label {
                    margin-right: 8px;
                    font-weight: 700;
                    word-break: keep-all;
                }
                input {
                    width: 60px;
                    text-align: right;
                    padding-right: 20px;
                    font-size: 20px;
                    line-height: 20px;
                    font-weight: 500;
                    font-family: 'Noto Sans KR';
                    border: 3px solid #294356;
                    -moz-appearance: textfield;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .container {
                    position: relative;
                }
                span {
                    position: absolute;
                    right: 5px;
                }
                button {
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    line-height: 20px;
                    font-weight: 700;
                    font-family: 'Noto Sans KR';
                    border: none;
                    background-color: #ffffff;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

const Button = ({ text, onClick, fontSize, background = "#294356", className }) => {
    return (
        <button onClick={onClick} className={className}>
            {text}
            <style jsx>{`
                button {
                    width: auto;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    height: auto;
                    font-size: ${fontSize}px;
                    line-height: ${fontSize}px;
                    color: #ffffff;
                    background-color: ${background};
                    font-weight: 700;
                    border: none;
                    position: relative;
                    margin: 10px;
                    cursor: pointer;
                }
                button::after {
                    content: "${text}";
                    padding: 5px 6px;
                    position: absolute;
                    z-index: -1;
                    display: block;
                    width: auto;
                    height: auto;
                    font-size: ${fontSize}px;
                    line-height: ${fontSize}px;
                    word-break: keep-all;
                    background: #000000;
                    color: #000;
                    top: ${fontSize / 8}px;
                    left: ${fontSize / 8}px;
                }
                .active {
                    background-color: #f10000;
                }
                button:not(.active):hover {
                    background-color: #4b6578;
                }
            `}</style>
        </button>
    );
};

const Item = ({ index, unregistered }) => {
    let { shelfFloor, width, height } = unregistered[index];
    return (
        <div draggable="true" index={index}>
            {shelfFloor}
            <style jsx>{`
                div {
                    width: ${width * 800 / 120}px;
                    height: ${height * 600 / 90}px;
                    background-color: #294356;
                    color: #ffffff;
                    font-size: 20px;
                    font-weight: 700;
                    font-family: 'Noto Sans KR';
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin: 5px;
                    cursor: pointer;
                    user-select:none;
                }
            `}</style>
        </div>
    );
}

const bookShelf = ({ bookshelfs }) => {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [floor, setFloor] = useState(1);
    const [selectedFloor, setSelectedFloor] = useState("1F");
    const [unregistered, setUnregistered] = useState([]);
    const [registered, setRegistered] = useState(bookshelfs);

    const itemsRef = useRef(null);
    const mapRef = useRef(null);

    const floors = [];
    bookshelfs.forEach(e => {
        if (!floors.includes(e.libraryFloor))
            floors.push(e.libraryFloor);
    });

    const [curFloors, setCurFloors] = useState(floors);

    const addCurFloor = () => {
        setCurFloors([...curFloors, Number(curFloors[curFloors.length - 1].replace("F", "")) + 1 + "F"]);
    };

    const selectFloor = (floor) => () => {
        setSelectedFloor(floor);
    };

    useEffect(() => {
        document.getElementsByTagName('html')[0].style.width = '100%';
        document.getElementsByTagName('body')[0].style.maxWidth = "none";

        return () => {
            document.getElementsByTagName('html')[0].style.width = 'auto';
            document.getElementsByTagName('body')[0].style.maxWidth = "520px";
        }
    }, []);

    useEffect(() => {
        const stage = new Konva.Stage({
            container: mapRef.current,
            width: 800,
            height: 600,
        });

        const layer = new Konva.Layer();
        stage.add(layer);

        let curDragItemIndex = -1;
        const dragStartFunc = (e) => {
            curDragItemIndex = Number(e.target.getAttribute('index'));
        }
        itemsRef.current.addEventListener('dragstart', dragStartFunc);

        let con = stage.container();
        const dragOverFunc = (e) => {
            e.preventDefault();
        }
        con.addEventListener('dragover', dragOverFunc);

        const dropFunc = (e) => {
            e.preventDefault();
            setRegistered([...registered, {
                shelfFloor: unregistered[curDragItemIndex].shelfFloor,
                width: unregistered[curDragItemIndex].width,
                height: unregistered[curDragItemIndex].height,
                positionX: Math.round(e.offsetX * 120 / 800 / 5) * 5,
                positionY: Math.round(e.offsetY * 90 / 600 / 5) * 5,
                libraryFloor: selectedFloor
            }]);
            setUnregistered(unregistered.filter((e, i) => i !== curDragItemIndex));
        }
        con.addEventListener('drop', dropFunc);

        registered.forEach((e, i) => {
            if (e.libraryFloor !== selectedFloor)
                return;

            let shelfGroup = new Konva.Group({
                x: e.positionX * 800 / 120,
                y: e.positionY * 600 / 90,
                draggable: true,
                width: e.width * 800 / 120,
                height: e.height * 600 / 90,
                index: i
            });

            shelfGroup.add(new Konva.Rect({
                width: e.width * 800 / 120,
                height: e.height * 600 / 90,
                fill: '#AD7D5A',
            }));

            shelfGroup.add(new Konva.Text({
                text: e.shelfFloor,
                fontSize: 20,
                fontFamily: 'Noto Sans KR',
                fill: 'white',
                x: e.width * 800 / 120 / 2 - 10,
                y: e.height * 600 / 90 / 2 - 10,
            }));

            shelfGroup.add(new Konva.Text({
                text: "X",
                fontSize: 15,
                fontFamily: 'Noto Sans KR',
                fill: 'black',
                x: e.width * 800 / 120 - 10,
                y: -10,
                width: 20,
                height: 20,
                align: 'center',
                verticalAlign: 'middle',
                background: 'white',
                cornerRadius: 2,
                padding: 2
            }));

            shelfGroup.children[2].on('click', function (e) {
                setUnregistered([...unregistered, {
                    shelfFloor: registered[i].shelfFloor,
                    width: registered[i].width,
                    height: registered[i].height,
                    positionX: null, positionY: null, libraryFloor: null
                }]);
                setRegistered(registered.filter((e, j) => j !== i));
            });

            layer.add(shelfGroup);
        });

        layer.on('dragend', function (e) {
            let index = e.target.attrs.index;
            let x = e.target.attrs.x;
            let y = e.target.attrs.y;
            setRegistered(registered.map((e, i) => {
                if (i === index) {
                    return {
                        ...e,
                        positionX: Math.round(x * 120 / 800 / 5) * 5,
                        positionY: Math.round(y * 90 / 600 / 5) * 5,
                        libraryFloor: selectedFloor
                    }
                }
                return e;
            }));
        });

        return () => {
            itemsRef.current.removeEventListener('dragstart', dragStartFunc);
            con.removeEventListener('dragover', dragOverFunc);
            con.removeEventListener('drop', dropFunc);
        }
    }, [unregistered, registered, selectedFloor]);


    const addUnregistered = () => {
        setUnregistered([...unregistered, { shelfFloor: floor, width: width, height: height, positionX: null, positionY: null, libraryFloor: null }]);
    };

    const save = async () => {
        if (unregistered.length !== 0) {
            alert("모든 책장을 책장에 추가해주세요.");
            return;
        }
        let result = await Promise.all(registered.map(async (e) => {
            if (e.id === undefined) {
                let result = await postAPI('/api/bookshelf/add', e);
                return { ...e, id: result.data.id };
            }
            let result = await postAPI('/api/bookshelf/edit', e);
            return { ...e, id: result.data.id };
        }));
        console.log(result);
        setRegistered(result);
        alert("저장되었습니다.");
    };

    return (
        <div>
            <h1>책장 관리하기</h1>
            <div className="container">
                <div className="left">
                    <NumberInput text="가로" unit="칸" value={width} onChange={setWidth} step={5} />
                    <NumberInput text="세로" unit="칸" value={height} onChange={setHeight} step={5} />
                    <NumberInput text="높이" unit="층" value={floor} onChange={setFloor} step={1} />
                    <Button className="add" text="추가하기" onClick={addUnregistered} fontSize="40"></Button>
                    <div ref={itemsRef} className="items">
                        {unregistered.map((e, i) => {
                            return (
                                <Item key={i} index={i} unregistered={unregistered} />
                            );
                        })}
                    </div>
                </div>
                <div className="right">
                    <div className="rightTop">
                        <div className="floor">
                            {curFloors.map((e, i) => {
                                return (
                                    <Button key={i + 1} text={e.replace("F", "층")} onClick={selectFloor(e)} className={e == selectedFloor ? "active" : ""} fontSize="20"></Button>
                                );
                            }
                            )}
                            <Button text="+" onClick={addCurFloor} fontSize="20"></Button>
                        </div>
                        <div className="Menu">
                            <Button text="초기화" onClick={e => { document.location.href = "/manage/bookShelf" }} fontSize="20"></Button>
                            <Button text="저장" onClick={save} fontSize="20" background="#f10000"></Button>
                        </div>
                    </div>
                    <div ref={mapRef} className="map" />
                </div>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    align-items: flex-end;
                    margin: 20px auto;
                    max-width: calc(100% - 148px);
                    width: 1100px;
                    height: 700px;
                    gap: 20px;
                    padding: 10px 50px;
                    border: 4px solid #f10000;
                    overflow-x: scroll;
                    overflow-y: hidden;
                }
                .container::-webkit-scrollbar {
                    background: RGBA(0, 0, 0, 0);
                    height: 10px;
                }
                .container::-webkit-scrollbar-thumb {
                    background: RGBA(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .container > div {
                    display: flex;
                    flex-direction: column;
                }
                .left {
                    width: 280px;
                    height: 100%;
                    align-items: center;
                }
                .right{
                    width: 800px;
                }
                .rightTop{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row;
                }
                .items {
                    width: 100%;
                    height: 100%;
                    border: 3px solid #294356;
                }
                .map {
                    width: 800px;
                    height: 600px;
                    border: 3px solid #294356;
                }
            `}</style>
        </div>
    );
}

export default bookShelf;

export const getServerSideProps = async (context) => {
    return {
        props: {
            bookshelfs: await (await getAPI("http://localhost:3000/api/bookshelf")).data
        },
    };
};