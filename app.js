require('colors');
const {
    selectMenu,
    continueToNext,
    readInput,
    selectTask,
    confirmOperation,
} = require('./helpers/inquirer');
const { writeFile, readFile } = require('./helpers/writeFile');
const Tasks = require('./models/tasks');

const main = async () => {
    console.clear();
    let option = null;
    const tasks = new Tasks();
    const taskList = readFile();
    if (taskList) tasks.setTasks(taskList);
    while (option !== 0) {
        option = await selectMenu();
        await processOption(option, tasks);
        await continueToNext();
    }
    writeFile(tasks.taskList);
};

const processOption = async (option, tasks) => {
    switch (option) {
        case 1:
            const description = await readInput('Descripción: ');
            tasks.createTask(description);
            break;
        case 2:
            tasks.printList();
            break;
        case 3:
            tasks.printList(false, true);
            break;
        case 4:
            tasks.printList(false, false);
            break;
        case 5:
            const idsToCheck = await selectTask(tasks.taskList, true);
            if (idsToCheck.length) {
                tasks.checkTasks(idsToCheck);
                console.log('\nTareas Completadas !'.green);
            }
            break;
        case 6:
            const idToRemove = await selectTask(tasks.taskList);
            if (idToRemove !== 0) {
                const ok = await confirmOperation(
                    '¿Está seguro que desea eliminar la tarea?'
                );
                if (ok) {
                    tasks.removeTask(idToRemove);
                    console.log('\nTarea Borrada !'.red);
                }
            }
            break;
    }
};

main();
