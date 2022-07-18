
const Titlebar = ({username, role, logout}) => {

    return(
        <header style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <div className="circle">IT</div>
            <div className="panel">
                <p className="m-0 pr-2" style={{fontSize: "0.5em", paddingRight: "0.5em", borderRight: "1px solid white"}}>welcome, <b>{username.charAt(0).toUpperCase() + username.slice(1)}</b></p>
                {role == "admin" ? <button className="btn btn-link" style={{fontSize: "0.5em", padding: "0px 0.5em 0px 0.5em", borderRight: "1px solid white", borderRadius: "0px"}}>Admin Tools</button> : <></>}
                <button className="btn btn-link ml-4" style={{padding: "0px 0px 0px 0.5em"}} onClick={logout}>logout</button>
            </div>
        </header>
    )
}