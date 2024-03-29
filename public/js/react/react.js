
const react = React;
const reactDOM = ReactDOM;
const {createRoot} = reactDOM;
const {useState, useEffect} = react;

const Store = {
    setItem: (key, value) => {
        try {
            return window.sessionStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            return window.sessionStorage.setItem(key, value);
        }
    },
    getItem: (key) => {
        const value = window.sessionStorage.getItem(key);
        try{
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },
    removeItem: (key) => {
        window.sessionStorage.removeItem(key);
    },
    clear: () => {
        window.sessionStorage.clear();
    }
}
const fetchUsers = async() => {
    return fetch('/home/users').then(response => response.json())
}
const fetchMessages = async() => {
    return fetch('home/messages').then(response => response.json());
}