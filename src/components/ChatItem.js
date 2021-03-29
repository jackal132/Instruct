// import axios from "axios";

const ChatItem = (props) => {
    
    const username = window.sessionStorage.getItem('username');
    const { message, handleMessage } = props;
    const className = (message.user === username) ? 'myChat' : 'otherChat';
    // const apiKey = process.env.REACT_APP_YOUTUBEAPI_KEY;
    
    // 채팅 메시지 클릭
//     const handleMessage = async (e) => {
//         let query = e.target.innerText;
//         await axios.get(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=${apiKey}&q=${query}&maxResults=5&type=video&videoEmbeddable=true`)
//                 .then(res => console.log(res, res.data.items))
//                 .catch(err => console.log(err));
// // https://www.youtube.com/watch?v=W_z6esc8KQk                
//     }

    return (
        <div className={className}>
            <div>{message.user} : </div>
            <div onClick={handleMessage}>{message.text}</div>
        </div>
    );
}

export default ChatItem;