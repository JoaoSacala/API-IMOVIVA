const express = require('express');
const router = require('./router');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, 'public','image')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    next();
});
app.use('/',router);


module.exports = app;