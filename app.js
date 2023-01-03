const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan")
require('dotenv').config();
var cors = require('cors');


const userRoute = require("./api/routes/userRoute");
const userGroupRoute = require('./api/routes/userGroupRoute');
const projectRoute = require('./api/routes/projectRoute');


const hostname = '0.0.0.0';
const port = 3000;

const server = express();

// mongoose.connect(process.env.MongoDB); // Sans docker
mongoose.connect(process.env.MongoDB).then((res) => {
    console.log("Connected");
}).catch((error) => {
    console.log("Erreur : ", error);
}) // Sans docker

server.use(express.urlencoded());
server.use(express.json());

server.use(cors()); 
server.use(morgan('dev'))

userRoute(server);
userGroupRoute(server);
projectRoute(server);


server.listen(port, hostname);