const Task = require('../models/Tasks');
const User = require('../models/User')
const Controller = {
    createTask: async (req, res) =>{
    try{
        const { task, description, userId } = req.body;
        const completed = false;
        const user = await User.findById(userId)
        const taskbody = new Task({task, description, completed, userId:user._id});
        
        await taskbody.save((err, taskSaved) =>{
            if(err) return res.status(500).send({message: "An error has occurred"});
            if(!taskSaved) return res.status(404).send({message: 'Error, 404 not saving'});
            res.status(200).send({message: 'save task success'})
        })
        user.tasks = user.tasks.concat(taskbody._id)
        await user.save();
    }catch(err){
        console.log(err);
    }
    },
   getTasks: async (req, res) =>{
    await Task.find({}).populate('userId', {name:1, email:1}).exec((err, allNotes) =>{
        if(err) return res.status(500).send({message: "An error has occurred"});
        if(!allNotes) return res.status(404).send({message: "404 users not founds"});
        return res.status(200).send({response: 'success', allNotes})  
      })
    },
    getTask: (req, res) =>{
        let taskId = req.params.id;     
        if(taskId == null) return res.status(404).send({message: "Failled to get task"})
        Task.findById(taskId, (err, task) =>{
            if(err) return res.status(500).send({message: "An error has occurred"});
            if(!task) return res.status(404).send({message: "Error 404 task not found"});
            return res.status(200).send({response: 'success',task})
        });
    }, 
   updateTask: (req, res) => {
    let taskId = req.params.id;
    let task = req.body;
    Task.findOneAndUpdate(taskId, task, {new: true}, (err, updateTask)  =>{
        if(err) return res.status(500).send({message: "An error has occurred"});
        if(!updateTask) return res.status(404).send({message: "Error 404 task not found"});
        return res.status(200).send({response: 'success',updateTask })
    });
    },
   deleteTask: async (req, res) =>{
    let taskId = req.params.id;
    Task.findOneAndDelete(taskId, (err, taskDelete) =>{
        if(err) return res.status(500).send({message: "An error has occurred"});
        if(!taskDelete) return res.status(404).send({message: "Error 404 task not found"});
        return res.status(200).send({response: 'success',taskDelete})
    })
    
}
}
module.exports = Controller;