import { useEffect, useState } from "react";

const Test = () => {

    const [divTop, setDivTop] = useState(0);
    const [divLeft, setDivLeft] = useState(0);
    const [flag, setFlag] = useState(false);

    useEffect(() =>{
    },[divTop, divLeft, flag])

    const divStyle = {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        border: "1px solid black",
        width: "100px",
        height: "50px",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
        position: "fixed",
        cursor: "pointer",
        background: 'white'
    }

    const onClickDiv = (e) => {
        setDivTop(e.clientY - 20);
        setDivLeft(e.clientX - 20);
        setFlag(!flag);
    }

    return (
        <div>
            <div style={divStyle} onClick={onClickDiv}>선택하세요.</div>
            <div style={
                {
                    display : flag === true ? 'block' : 'none',
                    top : divTop,
                    left : divLeft,
                    position: 'absolute',
                    background: '#e6e6e6',
                    width : '180px',
                    margin: '5px'
                }
            }>
                <p style={{
                    textAlign : 'center'
                }}>이내용을 링크로 열기</p>
            </div>
        </div>
    );
}

export default Test;