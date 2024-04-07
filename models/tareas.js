const Tarea = require("./tarea.js")

// Clase para gestionar las tareas.
//  Permite crear nuevas tareas y obtener el listado de tareas en formato de array.
class Tareas {
    // Propiedad para almacenar el listado de tareas.
    _listado = {};

    //Método getter para obtener el listado de tareas en formato de array.
    get listadoArray(){
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    /**
     * Constructor de la clase Tareas.
     * Inicializa el listado de tareas como un objeto vacío.
     */
    constructor(){
        this._listado = {};
    }

    borrarTareas(id = ''){
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tareaa => {
            this._listado[tareaa.id] = tareaa
        })
    }

    // Método para crear una nueva tarea y añadirla al listado de tareas.
    crearTareas(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompletoTareas(){
        this.listadoArray.forEach((tarea, i) => {
            const indice  = `${i + 1}`.green 
            const {desc, compleatdoEn} = tarea
            const estado = (compleatdoEn)
                                ?'Completada'.yellow
                                :'pendiente'.red
            console.log(`${indice} ${desc}:: ${estado}`);
            
        })
    }

    listarPendientesCompletadas(Completada = true){
        let contador = 0
        this.listadoArray.forEach((tarea, i) => {
            const indice  = `${i + 1}`.green 
            const {desc, compleatdoEn} = tarea
            const estado = (compleatdoEn)
                                ?'Completada'.yellow
                                :'pendiente'.red
            if (Completada){
                //mostrar completadas
                if (compleatdoEn) {
                    contador += 1
                    console.log(`${contador + '.' .green} ${desc}:: ${compleatdoEn}`);
                }

            }else{
                 //mostrar pendientes

                 if (!Completada) {
                    contador += 1
                    console.log(`${contador + '.' .green} ${desc}:: ${estado}`);
                }

            }
            console.log(`${indice} ${desc}:: ${estado}`);
            
        })
    }

    toggleCompletadas(ids= []){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.compleatdoEn){
                tarea.compleatdoEn = new Date().toISOString()
            }
        })

        this.listadoArray.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                const tarea = this._listado[tarea.id].compleatdoEn = null
            }
        })
    }



}

module.exports = Tareas