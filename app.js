const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors');


const userRoute = require("./api/routes/userRoute");


const hostname = '0.0.0.0';
const port = 3000;

const server = express();

// mongoose.connect(process.env.MongoDB); // Sans docker
mongoose.connect(process.env.MongoDB); // Sans docker

server.use(express.urlencoded());
server.use(express.json());

server.use(cors()); 

userRoute(server);


server.listen(port, hostname);