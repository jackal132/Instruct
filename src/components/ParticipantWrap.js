import '../css/Room.css';

const ParticipantWrap = (props) => {
    
    const { users } = props;
    let userList = [];
    if( users !== undefined && users.length !==0) {
        userList = users.map((user, index) => 
            <div key={index}>{user.username}</div>
        );
    }

    return (
        <div className="participantWrap">
            {userList}
        </div>
    );
}

export default ParticipantWrap;