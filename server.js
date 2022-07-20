require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server);
const port = process.env.PORT | 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd()+"/public"));

const main = require('./routes/app');
app.use('/app', main);
const home = require('./routes/home');
app.use('/home', home);

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/views/index.html");
})
app.use((req,res,next) => {
    res.status(404).type("text").send("error 404 page not found");
})

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true}, err => {
    if(err)return console.log(`could not connect to DB - ${err}`);
    console.timeStamp("program started")

    const listener = server.listen(port, () => {console.log(`listening on port ${listener.address().port}`)});

    io.on('connection', client => {
        require('./socketio/socketio')(client, io);
    })
})
