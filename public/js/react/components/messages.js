
const Messages = () => {
    const sendTestMessage = () => {
        console.log("in send funtion")
        socket.emit("sendMessage", {recipient:"admin", text:"tester message, PEACE"})
    }
    return(
        <div className="container bg-dark rounded row center justify-content-evenly" id="messages" style={{position: "absolute", top:"130px"}}>
            {/* <h5 className="p-5 m-5" style={{color:"grey", textAlign: "center"}}>nothing to show you</h5> */}
            <button className="btn btn-primary" onClick={sendTestMessage}>test message</button>
        </div>
    )
}