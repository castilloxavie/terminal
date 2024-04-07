require("colors");
const { guardarBD, leerDB } = require("./helpers/guardarArchivo.js");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarEliminar,
    mostrarListadoChecclist,
} = require("./helpers/inquerer");
const Tareas = require("./models/tareas.js");

console.clear();

/**
 * Función principal para la gestión de tareas mediante un menú interactivo.
 * Permite al usuario crear nuevas tareas y mostrar las existentes.
 */
const main = async () => {
    let opt = "";

    //instancia de la clase Tareas
    const tareas = new Tareas();

    const tareasDb = leerDB();

    if (tareasDb) {
        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDb);
    }

    //bucle primordial del programa
    do {
        // mostrar el menu y esperar la opcion del usuario
        opt = await inquirerMenu();

        //ejecuta acciones o procesos segun la opcion  seleccionada por el usuario
        switch (opt) {
            case "1":
                //opcion para crear una nueva tarea
                const desc = await leerInput(" descripción: ");
                tareas.crearTareas(desc);
                break;

            case "2":
                //opcion para mostrar las tareas que salieron bien
                tareas.listadoCompletoTareas();
                break;

            case "3":
                //opcion para mostrar las tareas que salieron bien
                tareas.listarPendientesCompletadas(true);
                break;

            case "4":
                //opcion para mostrar las tareas que salieron bien
                tareas.listarPendientesCompletadas(false);
                break;

            case "5":
                //opcion para mostrar las tareas que salieron bien
                const ids = await mostrarListadoChecclist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
                break;

            case "6":
                //opcion para borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArray);
                if (id !== "0") {
                    const confirmar = await confirmarEliminar("¿Estas seguro?");
                    if (confirmar) {
                        tareas.borrarTareas(id);
                        console.log("Tarea Borrada exitosamente");
                    }
                } 
                break;

            default:
                break;
        }

        guardarBD(tareas.listadoArray);

        // pausa la ejecucion hasta que el usuario precione enter para continuar
        await pausa();

        //continual el ciclo hata que l usuario desida salor
    } while (opt !== "0");
};

main();
