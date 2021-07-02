const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
  }))
  
//app.use(route)
app.use('/api', routes)

module.exports = app;
