const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get("/:id", (req, res, next)=>{
    const user = FighterService.search(req.params.id);
    if (user){
        res.data = user;
        next();
    }else{
        res.status(400).send({error:true, message:`can't find fighter with id: ${req.params.id}`})
    }
}, responseMiddleware);
router.get("/", (req, res, next) => {
    const fighters = FighterService.getFighters();
    if(fighters){
        res.data = fighters;
        next();
    }else {
        res.status(400).send({error:true, message:`can't find user with id`});
    }
}, responseMiddleware);


router.post("/",(req, res, next) => {
    if(req.body) {
        if(FighterService.search(res.data)){
            res.status(400).send({error:true, message:"fighter already exist"});
            return;
        }
        res.data = {...req.body, id:FighterService.generateId()};
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
    res.status(404).send({error:true, message:"something got wrong"});
}, createFighterValid, (req, res, next) => {
    const fighter = FighterService.createNewFighter(res.data);
    if (fighter){
        next();
    }
},responseMiddleware);

router.put("/:id", (req, res, next)=>{
    if(req.body) {
        res.data = {id:req.params.id};
        if(!FighterService.search({id:req.params.id})){
            res.status(400).send({error:true, message:`can't find user with this id: ${req.params.id}`});
            return;
        }
        res.data = {id:req.params.id, ...req.body};
        next();
    }else{
        res.status(404).send({error:true, message:"something got wrong"});
    }
}, updateFighterValid, (req, res, next)=>{
    const user = FighterService.updateFighter(res.data.id, res.data);
    if(user){
        next();
    }else {
        res.status(400).send({error:true, message:`can't find fighter with id: ${req.params.id}`});
    }
},responseMiddleware);

router.delete("/:id",(req,res,next)=>{
    if(!FighterService.search({id:req.params.id})){
        res.status(400).send({error:true, message:`can't find user with this id: ${req.params.id}`});
        return;
    }
    res.data = {fighters};
    next();
});

module.exports = router;