const {v4: uuidv4} = require('uuid')

class Tarea {
    id = '';
    desc= '';
    compleatdoEn = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.compleatdoEn = null;
    }
}


module.exports = Tarea