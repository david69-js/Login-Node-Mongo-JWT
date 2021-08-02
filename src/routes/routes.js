const express = require('express');
const app = express.Router();
const UserController = require('../controllers/controllerUser')
const TaskController = require('../controllers/controllerTask');
const { validateToken } = require('../jwt/jwt')

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

//Login and user
app.post('/register', UserController.register);
app.post('/login', validateToken, UserController.login);
app.get('/user/:id', validateToken, UserController.getUser);
app.delete('/delete-user/:id', validateToken, UserController.deleteUser);

//Task 
app.post('/add-task', validateToken, TaskController.createTask);
app.get('/get-task/:id', validateToken, TaskController.getTask)
app.put('/update-task/:id', validateToken, TaskController.updateTask);
app.delete('/delete-task/:id', validateToken, TaskController.deleteTask);


//Getdata
app.get('/get-users', UserController.getUsers);
app.get('/get-tasks', TaskController.getTasks);
app.get('/private-task', validateToken, UserController.private)
module.exports = app;