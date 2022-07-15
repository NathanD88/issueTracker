
let clients = new Object()

const socketio = (client, io) => {
    console.log(`${client.id} has connected`)
    io.to(client.id).emit('getUsername');

    client.on('setUsername', _username => {
        console.log(_username);
        clients[_username] = client.id;
        console.log(clients)
    })

    client.on('disconnect', () => {
        for(let cl in clients){
            if(clients[cl] == client.id){
                delete clients[cl];
                break;
            }
        }
        console.log("client logged off",clients)
    })
}

module.exports = socketio;