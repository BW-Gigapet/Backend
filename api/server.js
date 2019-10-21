const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/authRouter.js');
const userRouter = require('../users/userRouter.js');
const childRouter = require('../child/childRouter.js');
//const mealRouter = require('../meals/mealRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);
server.use('/api/users', userRouter);
server.use('/api/child', childRouter);
//server.use('/api/meals', mealRouter);

module.exports = server;