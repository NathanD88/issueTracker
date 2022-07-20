
const Messages = ({messages, refresh, user, users}) => {
    const [convo, openConvo] = useState("");
    const [conversation, setConversation] = useState("");

    const sendTestMessage = () => {
        // const recip = document.querySelector("#recip").value;
        const opt = document.querySelector("#userslist");
        const recip = opt.options[opt.selectedIndex].text;
        const msg = document.querySelector("#msg").value;
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
        console.log(e.target.value)
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
    return(
        <div className="container bg-dark rounded p-0" id="messages" style={{position: "absolute", top:"130px", display: "flex", flexDirection:"row"}}>
            {/* <h5 className="p-5 m-5" style={{color:"grey", textAlign: "center"}}>nothing to show you</h5> */}
            {/* <button className="btn btn-primary" onClick={sendTestMessage}>test message</button> */}
            {/* {messages.length ? 
            <>
                {messages.map(msg => { 
                    return (
                    <div className="column bg-light border-1 rounded-1 m-4 p-1" style={{width:"fit-content", display: "flex", flexDirection:"column", justifyContent: "center"}}> 
                        <div style={{color:"grey"}}>from: {msg.sender}</div> 
                        <div style={{color:"grey"}}>to: {msg.recipient}</div> 
                        <div style={{color:"grey"}}>message: {msg.text}</div> 
                        <div style={{color:"grey"}}>sent at {msg.sent}</div> 
                        <button className="btn btn-primary" id={msg._id} onClick={handleDeleteMessage}>delete message</button>
                    </div>
                )})} 
            </>:<h5 className="p-5 m-5" style={{color:"grey", textAlign: "center"}}>nothing to show you</h5>} */}
            <div className="pane bg-light d-flex flex-column">
                {users && users.map(u => {
                    return(<button className="btn btn-primary rounded-0" value={u.username} onClick={changeConversation}>{u.username}</button>)
                })}
            </div>
            <div className="bg-dark msg-div p-0">
                {user.role == "admin" && <div>
                    {/* <button className="btn btn-primary" onClick={deleteAllMessages}>delete all</button> */}
                </div>}
                {conversation == "" ? 
                    <div className="d-flex flex-column card p-2">
                        <h5 className="p-5 m-5" style={{color:"grey", textAlign: "center"}}>click a conversation to start</h5>
                        {/* <input type="text" placeholder="recipient" id="recip"/>
                        <select name="users" id="userslist">
                            {users && users.map(u => {
                                return(<option value={u.username}>{u.username}</option>)
                            })}
                        </select>
                        <input type="text" placeholder="message" id="msg"/>
                        <button type="button" onClick={sendTestMessage}>send message</button> */}
                    </div> :
                    <div className="w-100 h-100 d-flex flex-column">
                        <div className="d-flex flex-row justify-content-center bg-light rounded-bottom" style={{opacity:"0.6", borderTopRightRadius:"0.25em"}}>
                            <p className="m-0 p-2" style={{color: "black"}}>{conversation}</p><div className="circle" style={{width: "0.5em", height: "0.5em", backgroundColor:"green", marginTop: "1em"}}></div>
                        </div>
                        <div className="h-100 bg-dark d-flex flex-column-reverse "><p className="m-0 p-1"></p></div>
                        <div className="d-flex flex-row w-100 p-1">
                            <input class="form-control" id="msg" placeholder="type a message" autocomplete="off" style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}/>
                            <button className="btn btn-primary h-auto" style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}>send</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}