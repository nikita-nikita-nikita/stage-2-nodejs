const { UserRepository } = require('../repositories/userRepository');

class UserService {
    delete(id){
        if (this.search(id)){
            return UserRepository.delete(id);
        }
        return null;
    }
    updateUser(id, dataToUpdate){
        if (this.search(id)){
            return UserRepository.update(id, dataToUpdate);
        }
        return null;
    }
    getUsers(){
        return UserRepository.getAll();
    }
    createNewUser(user){
        return UserRepository.create(user);
    }
    generateId(){
        return UserRepository.generateId();
    }
    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();