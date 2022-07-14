require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT | 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(process.cwd()+"/public"));

const main = require('./routes/main');
app.use('/app', main);

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/views/index.html");
})
app.use((req,res,next) => {
    res.status(404).type("text").send("error 404 page not found");
})

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true}, err => {
    if(err)return console.log(`could not connect to DB - ${err}`);

    const listener = app.listen(port, () => {console.log(`listening on port ${listener.address().port}`)})
})
