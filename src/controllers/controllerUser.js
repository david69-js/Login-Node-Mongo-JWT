const User = require('../models/User');
const { generateAccessToken, isCorrectPassword } = require('../jwt/jwt')
const mongoose = require('mongoose');

const Controller = {
    register: async (req, res) =>{
      try{
        const {name, email, password } = req.body;
        const user = new User({_id: new mongoose.Types.ObjectId(), name, email, password});
       await user.save( (err, saveUser) =>{
            if(err) return res.status(500).send({message: 'An error has occurred'});
            if(!saveUser) return res.status(404).send({message: 'Error, 404 not saving'});
            const accessToken = generateAccessToken(user._id)
           return res.status(200).json({accessToken, message: 'success', user: user._id, auth: true})
       }) ;
      }catch(err){
          console.log(err);
        }
    },
    login: async (req, res) =>{
        try{
        const {email, password} = req.body;
        const accessToken = generateAccessToken(User._id)
        await User.findOne({email}, (err, user)  =>{
            if (err) return res.status(500).send({message: 'Failed to authentecate user'});
            if(!user) return res.status(404).send({message: 'failed'});
            
            return user.isCorrectPassword(password, (err, result ) =>{
                if(err) return res.status(500).send({message: 'Authentication error'});
                if(!result) return res.status(404).send({message: 'failed'})
                return  res.status(200).json({accessToken})
            }) 
        });
        }catch(err){
            console.log(err);
        }
    },
    getUsers: async (req, res) =>{
     try{
        await User.find({}).populate('tasks', {userId:0,completed:0}).exec((err, allUser) =>{
            if(err) return res.status(500).send({message: "An error has occurred"});
            if(!allUser) return res.status(404).send({message: "404 users not founds"});
            return res.status(200).send({response: 'success', allUser})  
          })
     }catch(err){
         console.log(err);
     }
        
    },
    deleteUser: async (req, res) =>{
      try{
        let taskId = req.params.id;
        Task.findOneAndRemove(taskId, (err, userDelete) =>{
            if(err) return res.status(500).send({message: "An error has occurred"});
            if(!userDelete) return res.status(404).send({message: "Error 404 todo not found"});
            return res.status(200).send({response: 'success',userDelete})
        })
      }catch(err){
          console.log(err);
      }
    },
    getUser: (req, res) =>{
        let userId = req.params.id;     
        if(userId == null) return res.status(404).send({message: "Failled to get user"})
        User.findById(userId, (err, user) =>{
            if(err) return res.status(500).send({message: "An error has occurred"});
            if(!user) return res.status(404).send({message: "Error 404 user not found"});
            return res.status(200).send({response: 'success',user})
        });
    }, 
    private: (req, res) =>{
        res.status(200).json([
            {
                _id: 1, 
                name: 'Task one',
                description: 'lorem 23423 jajajaj lo que sea pa'
            },
            {
                _id: 2, 
                name: 'Task two',
                description: 'lorem lo que sea pa'
            },
            {
                _id: 3, 
                name: 'Task three',
                description: 'lorem ipsum task three'
            }
        ])
    }
}
module.exports = Controller;