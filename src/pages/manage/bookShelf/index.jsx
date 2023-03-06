import React, { useState, useEffect, useRef } from 'react';
import CanvasComponent from '@/components/CanvasComponent';
import { getAPI } from '@/utils/fetch';

function NumberInput({ text, unit, value, onChange }) {
    return (
        <div>
            <label>{text}</label>
            <button onClick={() => onChange(value - 1)}>-</button>
            <div className="container">
                <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
                <span>{unit}</span>
            </div>
            <button onClick={() => onChange(value + 1)}>+</button>
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

const Button = ({ text, onClick, fontSize,background="#294356", className }) => {
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
                    top: ${fontSize/8}px;
                    left: ${fontSize/8}px;
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

const bookShelf = ({ bookshelfs }) => {
    const [width, setWidth] = useState(1);
    const [height, setHeight] = useState(1);
    const [floor, setFloor] = useState(1);
    const [selectedFloor, setSelectedFloor] = useState("1F");

    const itemsRef = useRef(null);
    const mapRef = useRef(null);

    const floors = [];
    bookshelfs.forEach(e => {
        if (!floors.includes(e.libraryFloor))
            floors.push(e.libraryFloor);
    });

    const [curFloors, setCurFloors] = useState(floors);

    const addCurFloor = () => {
            setCurFloors([...curFloors, Number(curFloors[curFloors.length - 1].replace("F", ""))+1+"F"]);
    };

    const selectFloor = (floor) => () => {
        setSelectedFloor(floor);
    };

    console.log(selectedFloor);

    useEffect(() => {
        document.getElementsByTagName('html')[0].style.width = '100%';
        document.getElementsByTagName('body')[0].style.maxWidth = "none";

        return () => {
            document.getElementsByTagName('html')[0].style.width = 'auto';
            document.getElementsByTagName('body')[0].style.maxWidth = "520px";
        }
    }, []);
    
    return (
        <div>
            <h1>책장 관리하기</h1>
            <div className="container">
                <div className="left">
                    <NumberInput text="가로" unit="칸" value={width} onChange={setWidth} />
                    <NumberInput text="세로" unit="칸" value={height} onChange={setHeight} />
                    <NumberInput text="높이" unit="층" value={floor} onChange={setFloor} />
                    <Button className="add"  text="추가하기" onClick={e=>{}} fontSize="40"></Button>
                    <div ref={itemsRef} className="items">
                    </div>
                </div>
                <div className="right">
                    <div className="rightTop">
                        <div className="floor">
                            {curFloors.map((e, i) => {
                                return (
                                    <Button key={i + 1} text={e.replace("F","층")} onClick={selectFloor(e)} className={e == selectedFloor ? "active" : ""} fontSize="20"></Button>
                                );
                            }
                            )}
                            <Button text="+" onClick={addCurFloor} fontSize="20"></Button>
                        </div>
                        <div className="Menu">
                            <Button text="초기화" onClick={e=>{}} fontSize="20"></Button>
                            <Button text="저장" onClick={e=>{}} fontSize="20" background="#f10000"></Button>
                        </div>
                    </div>
                    <div ref={mapRef} className="map"/>
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
            bookshelfs: await (await getAPI("http://15.165.230.7:8080/api/bookshelf")).data
        },
    };
};