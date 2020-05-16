const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const result = valid(res);
    if(result){
        const {status, toSend} = result;
        res.status(status).send(toSend);
        return;
    }
    writeFighter(fighter, res.data);
    delete res.data.password;
    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    const result = valid(res);
    if(result){
        const {status, toSend} = result;
        res.status(status).send(toSend);
        return;
    }
    writeFighter(fighter, res.data);
    delete res.data.password;
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;


function valid({data}) {
    Object.keys(fighter).forEach(key => {
        if(key!=="id"&&data[key]){
            return {status:400, toSend:{message:`${key} are required`, error:true}};
        }
    });
    if(data.power<=0){
        return {status:400, toSend:{error:true,message:`power can't be less than 0`}};
    }
    if(data.defense<1||data.defense>10){
        return {status:400, toSend:{error:true,message:`defense can't be more than 10 or less than 1`}};
    }
}

function writeFighter(fighter, newData) {
    Object.keys(fighter).forEach(key => {
        fighter[key] = newData[key];
    });
}