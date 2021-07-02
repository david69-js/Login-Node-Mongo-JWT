if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

//Mongo connection
const mongoose = require('mongoose');
const app = require('./app')
const Port = process.env.PORT || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.localhost, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("The connection to the database is successful");
    app.listen(Port, ()=>{
        console.log(`Run server in the Port: ${Port}`)
    })

    }).catch((err) => {
        console.log(err)            
    });