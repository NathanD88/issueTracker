
const Messages = ({messages, refresh, user}) => {
    const [convos, setConvos] = useState();
    const [conversation, setConversation] = useState("");

    const sendTestMessage = () => {
        const recip = document.querySelector("#recip").value;
        const msg = document.querySelector("#msg").value;
        console.log(recip, msg)
        socket.emit("sendMessage", {recipient:recip, text:msg})
        // refresh();
        // setTimeout(() => {
        //     setConversation(recip)
        // }, 1000)
        fetch("/home/message", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({message : {recipient:recip, text:msg, sender: user}})
        })
        .then(response => response.json())
        .then(result => {
            const {error} = result;
            if(!error){
                refresh();
                setTimeout(() => {
                    setConversation(recip)
                }, 1000)
            }
        })
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
            <div className="pane bg-light"></div>
            <div className="bg-dark msg-div p-1">
                {conversation == "" ? 
                    <div className="d-flex flex-column card p-2">
                        <input type="text" placeholder="recipient" id="recip"/>
                        <input type="text" placeholder="message" id="msg"/>
                        <button type="button" onClick={sendTestMessage}>send message</button>
                    </div> :
                    <Message messages={messages} recipient={conversation} me={user}/>
                }
            </div>
        </div>
    )
}