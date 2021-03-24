const username = window.sessionStorage.getItem('username');

const ChatItem = (props) => {

    const { message } = props;
    const className = (message.user === username) ? 'myChat' : 'otherChat';

    return (
        <div className={className}>
            <div>{message.user} : </div>
            <div>{message.text}</div>
        </div>
    );
}

export default ChatItem;