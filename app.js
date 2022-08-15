require('colors');
const { inquirerMenu, continueToNext } = require('./helpers/inquirer');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

const main = async () => {
    console.clear();
    let op = null;
    const tasks = new Tasks();
    while (op !== 0) {
        op = await inquirerMenu();
        const task = new Task('Comprar comida');
        console.log(task);
        await continueToNext();
    }
};

main();
