const rooms = {};

const insert = (room) => {
    rooms[room.id] = room;
}

const get = (roomId) => {
    return rooms[roomId];
}

const remove = (roomId) => {
    delete rooms[roomId];
}

export default { get, insert, remove };
