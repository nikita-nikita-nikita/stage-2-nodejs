const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    delete(id){
        if (this.search(id)){
            return FighterRepository.delete(id);
        }
        return null;
    }
    updateFighter(id, dataToUpdate){
        if (this.search(id)){
            return FighterRepository.update(id, dataToUpdate);
        }
        return null;
    }
    getFighters(){
        return FighterRepository.getAll();
    }
    createNewFighter(fighter){
        return FighterRepository.create(fighter);
    }
    generateId(){
        return FighterRepository.generateId();
    }
    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();