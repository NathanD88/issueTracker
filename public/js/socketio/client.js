
const socket = io();

socket.on('getUsername', () => {
    const _username = Store.getItem('user').username;
    socket.emit('setUsername', _username)
})
socket.on('message', message => {
    createToast(message);
    //console.log(Messages)
})
socket.on('receiveMessage', message => {
    console.log(message);
})


const createToast = (message) => {
    let cont = document.querySelector('.toast-container');
    if(!cont) {
        cont = document.createElement('div');
        cont.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");
        cont.style.zIndex = "11";
        document.querySelector('#root').appendChild(cont);
    } 
    const toastElement = Toast(message);
    const toast = new bootstrap.Toast(toastElement);
    toastElement.addEventListener('hidden.bs.toast', (e) => {
        e.target.remove();
    })
    cont.appendChild(toastElement)
    toast.show();
}

const Toast = ({title, text}) => {
    const toast = document.createElement('div');
    toast.classList.add("toast");
    //toast header
    const header = document.createElement('div');
    header.classList.add("toast-header");
    //header text
    const htext = document.createElement('strong');
    htext.classList.add("me-auto");
    htext.innerHTML = title;
    header.appendChild(htext);
    //timestamp
    const timestamp = document.createElement('small');
    timestamp.classList.add("text-muted");
    header.appendChild(timestamp);
    //close btn
    const close = document.createElement('button');
    close.type = "button";
    close.classList.add("btn-close");
    close.setAttribute('data-bs-dismiss', "toast");
    close.setAttribute("aria-label", "close");
    header.appendChild(close);
    //append header
    toast.appendChild(header);
    //toast body
    const body = document.createElement('div');
    body.classList.add("toast-body");
    body.innerHTML = text;
    //append body
    toast.appendChild(body);

    return toast;
}