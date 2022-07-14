
const Register = ({register, error, changeView}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const updateUsername = () => {
        setUsername(document.querySelector("#floatingUser").value);
    }
    const updatePassword = () => {
        setPassword(document.querySelector("#floatingPassword").value);
    }
    const updatePasswordConfirm = () => {
        setPasswordConfirm(document.querySelector("#floatingPasswordConfirm").value);
    }
    const handleRegister = () => {
        const user = {username, password, passwordConfirm};
        register(user);
    }
    return(
        <div className="card d-flex flex-column p-4 shadow">
            <h2 style={{textAlign: "center"}} className="mb-4">Register</h2>
            <p id="error" className="error" style={{textAlign: "center"}}>{error}</p>
            <div class="form-floating mb-3 justify-center">
                <input type="email" className="form-control" id="floatingUser" placeholder="User01" autoFocus onBlur={updateUsername}/>
                <label for="floatingUser">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onBlur={updatePassword}/>
                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Password" onBlur={updatePasswordConfirm}/>
                <label for="floatingPasswordConfirm">Password</label>
            </div>
            <button className="btn-primary rounded" onClick={handleRegister}>Register</button>
            <button className=" btn btn-link" onClick={changeView}>Login</button>
        </div>
    )
}