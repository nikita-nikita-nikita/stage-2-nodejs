const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
router.post("/", (req, res, next)=>{
    if(req.body) {
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
        res.data = {...req.body, id:req.params.id};
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
}, updateUserValid, (req, res, next)=>{
    const user = UserService.updateUser(res.data.id, res.data);
    if(user){
        next();
    }else {
        res.status(400).send({error:true, message:`can't find user with id: ${req.params.id}`});
    }
},responseMiddleware);

router.delete("/:id", (req, res, next)=>{
    const user = UserService.delete(req.params.id);
    if(user.length===0){
        res.status(400).send({error:true, message:`cannot delete user with id: ${req.params.id}`});
    }else {
        res.data = {user};
        next()
    }

}, responseMiddleware);
module.exports = router;