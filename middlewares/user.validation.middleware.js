const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const result = valid(res);
    if(result){
        const {status, toSend} = result;
        res.status(status).send(toSend);
        return;
    }
    writeUser(user, res.data);
    delete res.data.password;
    next();
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const result = valid(res);
    if(result){
        const {status, toSend} = result;
        res.status(status).send(toSend);
        return;
    }
    writeUser(user, res.data);
    delete res.data.password;
    next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;

function validateEmail(email) {
    const pattern  = /^([A-Za-z0-9_\-\.])+@gmail.com$/;
    return pattern .test(email);
}
function validatePhone(phoneNumber) {
    const pattern  = /\+380+[0-9]{9}$/;
    return pattern .test(phoneNumber);
}

function valid({data}) {
    Object.keys(user).forEach(key => {
        if(key!=="id"&&data[key]){
            return {status:400, toSend:{message:`${key} are required`, error:true}};
        }
    });
    if(!validateEmail(data.email)){
        return {status:400, toSend:{error:true,message:`email are incorrect`}};
    }
    if(!validatePhone(data.phoneNumber)){
        return {status:400, toSend:{error:true,message:`phoneNumber are incorrect`}};
    }
    if(data.password.length<=3){
        return {status:400, toSend:{error:true,message:`password is too short`}};
    }
}

function writeUser(user, newData) {
    Object.keys(user).forEach(key => {
        user[key] = newData[key];
    });
}