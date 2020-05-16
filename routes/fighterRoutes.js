const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

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
        res.data = {...req.body, id:req.params.id};
        next();
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
        res.data = {...req.body, id:req.params.id};
        next();
    }else {
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
    const fighters = FighterService.delete(req.params.id);
    if(fighters.length===0){
        res.status(400).send({error:true, message:`cannot delete fighter with id: ${req.params.id}`});
    }else {
        res.data = {fighters};
        next();
    }
});

module.exports = router;