const users = [];

const addUser = ({userId, id, username, roomId}) => {
    
    const exist = users.find((user) => user.roomId === roomId && user.username === username);
    console.log(username, roomId);
    if(!username || !roomId) return { err : 'Username and room are required.'};
    if(exist) return { err : 'Already exist User'};

    const user = { userId, id, username, roomId };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserByUserId = (id) => users.find((user) => user.userId === id);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUserByUserId, getUsersInRoom };