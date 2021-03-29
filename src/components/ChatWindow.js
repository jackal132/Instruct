import '../css/Room.css';
import ChatItem from './ChatItem';

const ChatWindow = (props) => {

    const { chatMessages, handleMessage } = props;

    const chatItems = chatMessages.map((message, index) => 
        <ChatItem message={message} handleMessage={handleMessage} key={index}/>
    );

    return (
        <div className="chatWindow">

            {chatItems}

        </div>
    );
}

export default ChatWindow;