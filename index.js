require('dotenv').config({ path: 'prod.env' });

//Mongo connection
const mongoose = require('mongoose');
const app = require('./src/app')
//const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, 
    {  
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true })
    .then(() => {
        console.log("The connection to the database is successful");
        app.listen(port, () => {
            console.log(`Run server in the Port: ${port}`)
        })

    }).catch((err) => {
        console.log(err)
    });