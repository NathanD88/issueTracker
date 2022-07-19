
let container = document.querySelector("#root");
const root = createRoot(container);

const message1 = {
    title:"System Administrator", 
    text:"add a close function to these notifcations"
}
const message2 = {
    title:"Nathan", 
    text:"or make them only appear under certian conditions"
}

let refreshTick;
const Home = () => {
    const [user, setUser] = useState("");
    const [tab, setTab] = useState("main")
    const [users, setUsers] = useState();
    const [messages, setMessages] = useState([]);
    
    const refresh = () => {
        fetchUsers().then(data => setUsers(data?.users))
        fetchMessages().then(data => setMessages(data?.messages))
    }
    const logout = () => {
        console.log("logging out");
        clearInterval(refreshTick);
        socket.emit('logout')
        let _username = Store.getItem("user").username;
        fetch('/app/logout', {
            method: 'POST',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({username: _username})
        })
        .then(response => response.json())
        .then(result => {
            const {error, dbuser} = result;
            if(error){
                console.log(error)
            }
            
            Store.clear();
            setUser(null);
            return window.location.href = "/";
        })
        
    }
    const changeTab = (newTab) => {
        if(newTab == "users"){
            fetchUsers()
            .then(result => {
                const _users = result.users;
                if(_users) setUsers(_users)
                setTab(newTab);
            })
        } else if(newTab == "messages") {
            fetchMessages()
            .then(result => {
                const msgs = result.messages;
                if(messages != msgs) setMessages(msgs);
                setTab(newTab);
            })
        } else {
            setTab(newTab);
        }
    }
    useEffect(() => {
        let _user = Store.getItem("user");
        if(_user){
            fetch('/app/decode', {
                method: 'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({token: _user.token})
            })
            .then(response => response.json())
            .then(result => {
                const {decoded, error} = result;
                if(error){
                    logout();
                }
                if(decoded){
                    setUser(_user);
                    refresh();
                    refreshTick = setInterval(() => {
                        refresh();
                    }, 15000)
                }
            })
        } else {
            console.log("no user")
            window.location.href = "/";
        }
    }, [])
    return(
        <>
            {
                user && 
                <>
                    <Titlebar username={user.username} logout={logout} role={user.role}/>
                    <Menubar selectTab={changeTab}/>
                    {tab == "main" && <><Main notifications={[message1,message2]}/></>}
                    {tab == "users" && <Users users={users}/>}
                    {tab == "messages" && <Messages messages={messages} refresh={refresh} user={user.username}/>}
                    {tab == "issues" && <Issues />}
                </>
            }
        </>
    )
}

root.render(<Home />)