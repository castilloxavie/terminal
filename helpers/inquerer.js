const inquirer = require("inquirer");
require("colors");

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que desa hacer?",
        choices: [
            {
                value: "1",
                name: `${"1.".red} Crea Tarea`,
            },
            {
                value: "2",
                name: `${"2.".red} Listar Tareas`,
            },
            {
                value: "3",
                name: `${"3.".red} Listar Tareas Completadas`,
            },
            {
                value: "4",
                name: `${"4.".red} Listar Tareas Pendientes`,
            },
            {
                value: "5",
                name: `${"5.".red} Completar Tarea(s)`,
            },
            {
                value: "6",
                name: `${"6.".red} Borrar tarea`,
            },
            {
                value: "0",
                name: `${"0.".red} Salir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();

    console.log("=======================".red);
    console.log(" Seleccione una Opción ".green);
    console.log("=======================\n".red);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
};

const pausa = async () => {
    const pregunta = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".red} para Continuar`,
        },
    ];
    console.log("\n");
    await inquirer.prompt(pregunta);
};

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}. `.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "borrar",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmarEliminar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message
        },
    ];
    const { ok } = await inquirer.prompt(question)
    return ok
};


const mostrarListadoChecclist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}. `.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.compleatdoEn) ? true : false
        };
    });


    const preguntass = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices 
        },
    ];

    const { ids } = await inquirer.prompt(preguntass);
    return ids;
};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarEliminar,
    mostrarListadoChecclist
};
