const mongose = require('mongoose')
const Tasks = require('./Tasks');
const salRounds = 10; //Bcryp know, how to many times should yo encrypt
const Schema = mongose.Schema;
const bcrypt = require('bcrypt');


const modelUser = Schema ({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{type: Schema.ObjectId, ref: 'Tasks'}]
},{
    timestamps: true
})
modelUser.pre('save', function(next) {
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, salRounds, function(err, hashedPassword) {
            if(err) return next(err);
            document.password = hashedPassword;
            next();
        })
    }else{
        next();
    }
});

module.exports = mongose.model('User', modelUser)