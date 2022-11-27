const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors');


const hostname = '0.0.0.0';
const port = 3000;

const server = express();

// mongoose.connect(process.env.MongoDB); // Sans docker
// mongoose.connect('mongodb://mongo/nodeapi'); // Avec docker

server.use(express.urlencoded());
server.use(express.json());

server.use(cors()); 

server.listen(port, hostname);