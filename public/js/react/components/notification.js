
const Notification = ({title,text}) => {

    return (
        <div className="card col-sm-5 m-4 p-0">
            <div className="card-header">
                System Message
                <span>
                    <button type="button" class="btn-close float-end" aria-label="Close"></button>
                </span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
}