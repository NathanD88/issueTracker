let container = document.querySelector("#root");
const root = createRoot(container);

const App = () => {
    const [view, setView] = useState("login");
    const [error, setError] = useState("");
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null)
    
    const changeView = () => {
        setView(view == "login" ? "register" : "login")
    }
    const register = (newUser) => {
        fetch('/app/register', {
            method: 'POST',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const {error, dbuser} = result;
            if(error){
                setError(`*${error}*`);
            }
            if(dbuser){
                changeView();
            }
        })
    }
    const login = (_user) => {
        fetch('/app/login', {
            method: 'POST',
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({username: _user.username, password: _user.password})
        })
        .then(response => response.json())
        .then(result => {
            const {error, dbuser} = result;
            if(error){
                setError(`*${error}*`);
            } else {
                setError("");
            }
            if(dbuser){
                setError("");
                Store.setItem("user", dbuser);
                setUser(dbuser);
                //setLogged(true);
                window.location.href = '/home';
            }
        })
    }
    

    useEffect(() => {
        let _user = Store.getItem("user");
        if(_user){
            console.log(_user);
            fetch('/app/decode', {
                method: 'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({token: _user.token})
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                const {decoded, error} = result;
                if(error){
                    Store.removeItem("user");
                    setUser(null);
                    return window.location.reload();
                }
                if(decoded){
                    setUser(_user);
                    window.location.href = "/home";
                }
            })
        }
    }, [])

    return(
        <>{!user &&
            <>
                <Header />
                {view == "login" ? 
                    <Login login={login} error={error} changeView={changeView}/> : 
                    <Register register={register} error={error} changeView={changeView}/>
                }
            </>
        }
            
        </> 
    )
}

root.render(<App />)