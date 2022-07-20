
const Messages = ({messages, refresh, user, users}) => {
    const [conversation, setConversation] = useState("");

    const getUserByUsername = (un) => {
        for(let u in users){
            if(users[u].username == un) return users[u].status
        }
        return null;
    }
    const handleSubmit = (e) => {
        if(e.keyCode == 13){
            sendMessage();
        }
    }
    const sendMessage = () => {
        const recip = conversation;
        const msg = document.querySelector("#msg").value;
        if(msg == ""){
            return document.querySelector("#msg").value = "";
        }
        socket.emit("sendMessage", {recipient:recip, text:msg})
        fetch("/home/message", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({message : {recipient:recip, text:msg, sender: user.username}})
        })
        .then(response => response.json())
        .then(result => {
            const {error} = result;
            if(!error){
                setConversation(recip);
                refresh();
            }
        })
        document.querySelector("#msg").value = "";
    }
    const deleteAllMessages = () => {
        fetch("/home/delete", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({id:"*"})
        })
        .then(response => response.json())
        .then(result => {
            const {error} = result;
            if(!error){
                setConversation("")
                refresh();
            }
        })
    }
    const changeConversation = (e) => {
        setConversation(e.target.value)
    }
    const handleDeleteMessage = (e) => {
        const id = e.target.id;
        const parent = e.target.parentNode;
        fetch('/home/delete', {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({ id:id })
        })
        .then(response => response.json())
        .then(result => {
            const {error} = result;
            //if(!error) parent.remove();
            refresh();
        })
    }
    useEffect(() => {
        if(conversation == "") return;
        const send = document.getElementById("msg");
        send.addEventListener('keydown', handleSubmit)
    }, [conversation])
    return(
        <div className="container bg-dark rounded p-0" id="messages" style={{position: "absolute", top:"130px", display: "flex", flexDirection:"row"}}>
            <div className="pane bg-light d-flex flex-column">
                {users && users.map(u => {
                    return(<button className="btn btn-primary rounded-0" value={u.username} onClick={changeConversation}>{u.username == user.username ? "me" : u.username}</button>)
                })}
            </div>
            <div className="bg-dark msg-div p-0">
                {conversation == "" ? 
                    <div className="d-flex flex-column card p-2">
                        <h5 className="p-5 m-5" style={{color:"grey", textAlign: "center"}}>click a conversation to start</h5>
                    </div> :
                    <div className="w-100 h-100 d-flex flex-column">
                        <div className="d-flex flex-row justify-content-center bg-light rounded-bottom" style={{opacity:"0.6", borderTopRightRadius:"0.25em"}}>
                            <p className="m-0 p-2" style={{color: "black"}}>{conversation == user.username ? "me" : conversation}</p>
                            <div className="circle border-0" style={{width: "0.5em", height: "0.5em", backgroundColor:getUserByUsername(conversation) == "Online" ? "green" : "red", marginTop: "1em"}}></div>
                        </div>
                        <div className="h-100 bg-dark d-flex flex-column">
                            {messages.length > 0 && messages.map(msg => {
                                if((msg.sender == conversation && msg.recipient == user.username) || (msg.recipient == conversation && msg.sender == user.username)){
                                    //return msg.sender == user.username ? <p className="m-0 p-2 pb-0" style={{textAlign:"right"}}>{msg.text}</p> : <p className="m-0 p-2 pb-0">{msg.text}</p>
                                    return (<Message message={msg} user={user}/>)
                                }
                            })}
                        </div>
                        <div className="d-flex flex-row w-100 p-1">
                            <input class="form-control" id="msg" placeholder="type a message" autocomplete="off" style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}} autoFocus />
                            <button className="btn btn-primary h-auto" style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}} onClick={sendMessage} id="send-btn">send</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}