
const socket = io();

socket.on('getUsername', () => {
    const _username = Store.getItem('user').username;
    console.log(_username);
    socket.emit('setUsername', _username)
})