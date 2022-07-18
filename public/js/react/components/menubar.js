
const Menubar = ({selectTab}) => {
    const changeActive = (e) => {
        let active = document.getElementsByClassName("active");
        for(var i=0;i<active.length;i++){
            active[i].classList.remove("active");
        }
        e.target.classList.add("active");
        let tabName = e.target.innerHTML.toLowerCase();
        selectTab(tabName)
    }
    return (
        
        <div className="bg-dark menubar conatiner rounded-top">
            <ul class="nav nav-tabs">
                <li class="nav-item mt-2 mx-2 mb-0">
                    <a class="nav-link active" onClick={changeActive}>Main</a>
                </li>
                <li class="nav-item mt-2 mx-2 mb-0">
                    <a class="nav-link" onClick={changeActive}>Users</a>
                </li>
                <li class="nav-item mt-2 mx-2 mb-0">
                    <a class="nav-link" onClick={changeActive}>Messages</a>
                </li>
                <li class="nav-item mt-2 mx-2 mb-0">
                    <a class="nav-link" onClick={changeActive}>Issues</a>
                </li>
                {/* <li class="nav-item mt-2 mx-2 mb-0">
                    <a class="nav-link" onClick={changeActive}>New Issue</a>
                </li> */}
            </ul>
        </div>
    )
}