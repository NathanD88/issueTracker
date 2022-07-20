const axios = require("axios");
const Message = require(process.cwd()+'/models/message')
let clients = new Object();
const message_url = 'http://localhost:5000/home/message';
const headers = { "Content-type": "application/json"};

let cleanTime;
const cleanup = (user) => {
    
    if(!clients.hasOwnProperty(user)) return;
    if(clients[user] == "") {
        forceLogout(user);
        return delete clients[user];
    }
}

const forceLogout = (user) => {
    axios.post("http://localhost:5000/app/logout", { username: user }, 
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }
    )
}

const getClientById = (id) => {
    for(let client in clients){
        if(clients[client] == id) return client;
    }
    return null;
}

const socketio = (client, io) => {
    //console.log(`${client.id} has connected`)
    io.to(client.id).emit('getUsername');

    client.on('setUsername', _username => {
        if(clients.hasOwnProperty(_username)){
            clearTimeout(cleanTime)
            clients[_username] = client.id;
            return;
        }
        clients[_username] = client.id;
        //io.to(client.id).emit('message', {title:"admin.io", text:`Welcome back, ${_username}`});
        client.broadcast.emit('message', {title:"admin.io", text:`${_username} has logged in`})
        // setTimeout(() => {
        //     io.to(client.id).emit('message', {title:"admin.io", text:`no new messages.`});
        // }, 2000);
    })
    client.on('sendMessage', message => {
        let {recipient} = message;
        let sender = getClientById(client.id)
        message.sender = sender;
        console.log(message)
        //axios.post(message_url, {message} , headers);
        io.to(clients[recipient]).emit("receiveMessage", message)
        io.to(clients[recipient]).emit("message", {title:"admin.io", text:`new message from ${sender}`})
    })
    client.on('logout', () => {
        for(let cl in clients){
            if(clients[cl] == client.id){
                client.broadcast.emit('message', {title:"admin.io", text:`${cl} has logged out`})
                delete clients[cl];
                break;
            }
        }
    })
    client.on('disconnect', () => {
        for(let cl in clients){
            if(clients[cl] == client.id){
                console.log(`${cl} disconnected`)
                clients[cl] = "";
                cleanTime = setTimeout(() => {
                    cleanup(cl)
                }, 60000)
                break;
            }
        }
        //console.log("client logged off",clients)
    })
}

module.exports = socketio;