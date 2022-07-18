
const Users = ({users}) => {
    const formattedDate = (date) => {
        if(!date) return "";
        return new Date(date).toDateString();;
    }
    return(
        <div className="container bg-dark rounded row center justify-content-center" style={{position:"absolute", top:"130px"}}>
            <h6 style={{color:"white", textAlign: "center"}}>All Users</h6>
            <table class="table table-hover table-light" style={{textAlign: "center", borderTopRightRadius: "50%"}}>
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Status</th>
                    <th scope="col">Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => 
                        <tr>
                        <td>{user.username}</td>
                        <td>{user.status}</td>
                        <td>{formattedDate(user.lastLogin)}</td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}