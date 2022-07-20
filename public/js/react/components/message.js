
const Message = ({message, user}) => {
    
    const handleDeleteMessage = () =>{
        console.log("deleting")
    }

    return (
        <div className="rounded p-1" style={{color:"black"}}>
            {message.sender == user.username ? 
                <p className="card m-0 p-1 " style={{float:"right", borderBottomRightRadius:"0px"}}>{message.text}</p> : 
                <p className="card m-0 p-1 " style={{borderBottomLeftRadius:"0px", width:"fit-content"}}>{message.text}</p>}
        </div>
    )
}