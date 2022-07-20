
const Message = ({messages, recipient, me}) => {
    const [conversation, setConversation] = useState([]);

    const handleDeleteMessage = () =>{
        console.log("deleting")
    }
    useEffect(() => {
        if(messages.length == 0) return setConversation([]);
        let conv = messages.map(msg => {
            if((msg.sender == recipient && msg.recipient == me) || (msg.recipient == recipient && msg.sender == me)){
                return msg;
            }
        })
        setConversation(conv);
    }, [messages])
    return (<div className="w-100 h-100 d-flex flex-column">
        {conversation.length != 0 && <>
            {/* {conversation.map(cnv => {
                return(<>
                    <div style={{color:"grey"}}>from: {cnv.sender}</div> 
                    <div style={{color:"grey"}}>to: {cnv.recipient}</div> 
                    <div style={{color:"grey"}}>message: {cnv.text}</div> 
                    <div style={{color:"grey"}}>sent at {cnv.sent}</div> 
                    <button className="btn btn-primary" id={cnv._id} onClick={handleDeleteMessage}>delete message</button>
                </>)
            })} */}
        </>}
        {/* <div className="h-100 bg-dark d-flex flex-column-reverse "><p className="m-0 p-1">tester etxt</p></div>
        <div className="d-flex flex-row w-100">
            <textarea class="form-control" id="msg" rows="1"></textarea>
            <button className="btn btn-primary h-auto">send</button>
        </div> */}
    </div>)
}