//load env varaiables
const dotenv = require('dotenv');
dotenv.config();
const default_port = process.env.PORT || 3200;
const morgan_format = process.env.MORGE_FORMAT;

const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const express = require('express');
const morgan  = require('morgan');
const bodyParser = requrie('body-parser');


var logDirectory = path.join(__dirname, 'log')
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

const app = express();
app.use(morgan(morgan_format, { stream: accessLogStream }));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(default_port, ()=> console.log(`server is listening at ${default_port}`));