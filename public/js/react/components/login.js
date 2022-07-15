
const Login = ({login, error, changeView}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = () => {
        setUsername(document.querySelector("#floatingUser").value);
    }
    const updatePassword = () => {
        setPassword(document.querySelector("#floatingPassword").value);
    }
    const handleLogin = () => {
        const user = {username, password};
        login(user);
        document.querySelector("#floatingUser").value = "";
        document.querySelector("#floatingPassword").value = "";
        document.querySelector("#floatingUser").focus();
    }
    return(
        <div className="card d-flex flex-column p-4 shadow">
            <h2 style={{textAlign: "center"}} className="mb-4">Login</h2>
            <p id="error" className="error" style={{textAlign: "center"}}>{error}</p>
            <div class="form-floating mb-3 justify-center">
                <input type="email" className="form-control" id="floatingUser" placeholder="User01" autoFocus onBlur={updateUsername} autoComplete="off"/>
                <label for="floatingUser">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onBlur={updatePassword}/>
                <label for="floatingPassword">Password</label>
            </div>
            <button className="btn-primary rounded mb-2" onClick={handleLogin}>login</button>
            <button className=" btn btn-link" onClick={changeView}>Register</button>
        </div>
    )
}