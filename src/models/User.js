const mongose = require('mongoose')
const bcrypt = require('bcrypt');
const Tasks = require('./Tasks');
const salRounds = 10; //Bcryp know, how to many times should yo encrypt
const Schema = mongose.Schema;

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

modelUser.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same){
        if(err) return callback(err);
        callback(err, same)
    })
}
module.exports = mongose.model('User', modelUser)