
const Message = ({messages, recipient, me}) => {
    const [conversation, setConversation] = useState([]);

    const handleDeleteMessage = () =>{
        console.log("deleting")
    }
    useEffect(() => {
        if(messages.length > 0 && recipient != ""){
            let conv = messages.map(msg => {
                if((msg.sender == recipient && msg.recipient == me) || (msg.recipient == recipient && msg.sender == me)){
                    return msg;
                }
            })
            console.log(conv);
            setConversation(conv);
        }
    }, [])
    return (<>
        {conversation.length != 0 && <>
            {conversation.map(cnv => {
                return(<>
                    <div style={{color:"grey"}}>from: {cnv.sender}</div> 
                    <div style={{color:"grey"}}>to: {cnv.recipient}</div> 
                    <div style={{color:"grey"}}>message: {cnv.text}</div> 
                    <div style={{color:"grey"}}>sent at {cnv.sent}</div> 
                    <button className="btn btn-primary" id={cnv._id} onClick={handleDeleteMessage}>delete message</button>
                </>)
            })}
        </>}
    </>)
}