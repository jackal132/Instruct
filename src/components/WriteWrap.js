import '../css/Room.css';

const WriteWrap = (props) => {

    const { handleChange, handleSubmit, chatMessage } = props;
    
    return (
        <div className="writeWrap">
            <form className="writeForm" onSubmit={handleSubmit} >
                <div className="writeWindow">
                    <input type="text" name="chatMessage" className="inputBox" onChange={handleChange} value={chatMessage}/>
                    <button type="submit" className="enterBtn">Enter</button>
                </div>
            </form>
        </div>
    );
}

export default WriteWrap;