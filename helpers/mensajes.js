require("colors");

const mostrarMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log("=======================".red);
        console.log(" Seleccione una Opción ".green);
        console.log("=======================\n".red);

        console.log(`${"1.".yellow} Crear Tarea`);
        console.log(`${"2.".yellow} Listar tareas`);
        console.log(`${"3.".yellow} Listar tareas Completadas`);
        console.log(`${"4.".yellow} Listar Tareas pendientes`);
        console.log(`${"5.".yellow} Completar Tarea(s)`);
        console.log(`${"6.".yellow} Borrar Tareas`);
        console.log(`${"0.".yellow} Salir\n`);

        /*1. Este fragmento de código crea una interfaz para leer la entrada del usuario desde la consola */
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question("Seleccione una opción: ", (opt) => {
            readline.close();
            resolve(opt);
        });
    });
};

/**
 *2. crea una promesa que se resuelve cuando el usuario presiona la tecla Enter.
 * retorna Se está devolviendo una promesa
 */
const pausa = () => {
    return new Promise((resolve) => {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(
            `\nPresione ${"ENTER".red} para Continuar\n`,
            (opt) => {
                readline.close();
                resolve();
            }
        );
    });
};

module.exports = {
    mostrarMenu,
    pausa,
};
