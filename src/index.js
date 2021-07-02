if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ path: 'prod.env' });
}

//Mongo connection
const mongoose = require('mongoose');
const app = require('./app')
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.LOCALHOST, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("The connection to the database is successful");
        app.listen(port, host, () => {
            console.log(`Run server in the Port: ${port}`)
        })

    }).catch((err) => {
        console.log(err)
    });