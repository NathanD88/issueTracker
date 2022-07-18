
const Reset = ({verified, verifyUser, updateUserPassword, error, changeView}) => {
    //const [verified, setVerified] = useState(false);
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
    const handleUserVerify = () => {
        verifyUser(username);
    }
    const handleUpdatePassword = () => {
        const user = {username, password, passwordConfirm};
        console.log(user)
        updateUserPassword(user)
    }
    const viewChangeRegister = () => {
        changeView("register")
    }
    const viewChangeLogin = () => {
        changeView("login");
    }
    return(
        <div className="card d-flex flex-column p-4 shadow">
            <h2 style={{textAlign: "center"}} className="mb-4">Reset Password</h2>
            <p id="error" className="error" style={{textAlign: "center"}}>{error}</p>
            {!verified && <>
                <div class="form-floating mb-3 justify-center">
                    <input type="email" className="form-control" id="floatingUser" placeholder="User01" autoFocus onBlur={updateUsername}/>
                    <label for="floatingUser">Username</label>
                </div>
                <button className="btn-primary rounded" onClick={handleUserVerify}>Verify and Update</button>
            </>}
            {verified && <>
                <div class="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoFocus onBlur={updatePassword}/>
                    <label for="floatingPassword">New Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Password" onBlur={updatePasswordConfirm}/>
                    <label for="floatingPasswordConfirm">Confirm Password</label>
                </div>
                <button className="btn-primary rounded" onClick={handleUpdatePassword}>Update Password</button>
                <button className=" btn btn-link" onClick={viewChangeLogin}>Login</button>
                <button className=" btn btn-link p-0" onClick={viewChangeRegister}>Register</button>
            </>}
            
            
        </div>
    )
}