const inquirer = require('inquirer');
require('colors');

const menuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green}Crear tarea`,
            },
            {
                value: 2,
                name: `${'2.'.green} Listar tareas`,
            },
            {
                value: 3,
                name: `${'3.'.green} Listar tareas completadas`,
            },
            {
                value: 4,
                name: `${'4.'.green} Listar tareas pendientes`,
            },
            {
                value: 5,
                name: `${'5.'.green} Completar tarea(s)`,
            },
            {
                value: 6,
                name: `${'6.'.green} Borrar tarea`,
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`,
            },
        ],
    },
];

const selectMenu = async () => {
    console.clear();
    console.log(`===============================`.green);
    console.log(` TODO List `.white);
    console.log(`===============================\n`.green);

    const { option } = await inquirer.prompt(menuQuestions);
    return option;
};

const continueToNext = async () => {
    const enterQuestion = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        },
    ];
    console.log('\n');
    await inquirer.prompt(enterQuestion);
};

const readInput = async (message) => {
    const inputQuestion = [
        {
            type: 'input',
            name: 'inputValue',
            message,
            validate(value) {
                if (!value.length) return 'Por favor, ingrese un valor';
                return true;
            },
        },
    ];

    const { inputValue } = await inquirer.prompt(inputQuestion);
    return inputValue;
};

const selectTask = async (tasks = [], isMultipleSelect = false) => {
    const choices = tasks.map((task, i) => {
        const colorIndex = `${++i}`.green;
        const checked = isMultipleSelect && task.checkDate;
        return {
            value: task.id,
            name: `${colorIndex}. ${task.description}`,
            checked,
        };
    });

    !isMultipleSelect &&
        choices.push({
            value: 0,
            name: `${'0'.green}. Volver al menú`,
        });

    const type = isMultipleSelect ? 'checkbox' : 'list';
    const taskQuestions = [
        {
            type: type,
            name: 'selectedTasks',
            message: 'Elija la/s tarea/s',
            choices: choices,
        },
    ];

    const { selectedTasks } = await inquirer.prompt(taskQuestions);
    return selectedTasks;
};

const confirmOperation = async (message) => {
    const confirmQuestion = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ];
    const { ok } = await inquirer.prompt(confirmQuestion);
    return ok;
};

module.exports = {
    selectMenu,
    continueToNext,
    readInput,
    selectTask,
    confirmOperation,
};
