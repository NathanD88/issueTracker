let container = document.querySelector("#root");
const root = createRoot(container);

const Home = () => {
    const [user, setUser] = useState("");

    const logout = () => {
        console.log("logging out");
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
                    <Titlebar username={user.username} logout={logout}/>
                </>
            }
        </>
    )
}

root.render(<Home />)