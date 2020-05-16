const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
router.post("/", (req, res, next)=>{
    if(req.body) {
        if(UserService.search(res.data)){
            res.status(400).send({error:true, message:"user already exist"});
            return;
        }
        res.data = {...req.body, id:UserService.generateId()};
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
}, createUserValid,(req, res, next)=>{
    const user = UserService.createNewUser(res.data);
    if(user){
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
}, responseMiddleware);

router.get("/:id", (req, res, next)=>{
    const user = UserService.search(req.params.id);
    if (user){
        res.data = user;
        next();
    }else{
        res.status(400).send({error:true, message:`can't find user with id: ${req.params.id}`})
    }
}, responseMiddleware);
router.get("/", (req, res, next)=>{
    const users = UserService.getUsers();
    if (users){
        res.data = users;
        next();
    }else {
        res.status(400).send({error:true, message:`can't find users`})
    }
}, responseMiddleware);

router.put("/:id", (req, res, next)=>{
    if(req.body) {
        res.data = {id:req.params.id};
        if(!UserService.search({id:req.params.id})){
            res.status(400).send({error:true, message:`can't find user with this id: ${req.params.id}`});
            return;
        }
        res.data = {id:req.params.id, ...req.body};
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
}, updateUserValid, (req, res, next)=>{
    const user = UserService.updateUser(res.data.id, res.data);
    if(user){
        next();
    }else {
        res.status(400).send({error:true, message:"something got wrong"});
    }
},responseMiddleware);

router.delete("/:id", (req, res, next)=>{
    if(!UserService.search({id:req.params.id})){
        res.status(400).send({error:true, message:`can't find user with this id: ${req.params.id}`});
        return;
    }
    const user = UserService.delete(req.params.id);
    res.data = {user};
    next()

}, responseMiddleware);
module.exports = router;