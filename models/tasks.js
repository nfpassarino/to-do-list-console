const Task = require('./task');

class Tasks {
    tasks = {};
    constructor() {
        this.tasks = {};
    }
    get taskList() {
        const taskList = [];
        Object.values(this.tasks).forEach((task) => taskList.push(task));
        return taskList;
    }
    setTasks(tasks = []) {
        tasks.forEach((task) => (this.tasks[task.id] = task));
    }
    createTask(description = '') {
        const task = new Task(description);
        this.tasks[task.id] = task;
    }
    removeTask(id = '') {
        if (this.tasks[id]) {
            delete this.tasks[id];
        }
    }
    checkTasks(ids = []) {
        Object.keys(this.tasks).forEach((id) => {
            const task = this.tasks[id];
            if (ids.includes(id)) {
                if (!task.checkDate) task.checkDate = new Date().toISOString();
            } else {
                task.checkDate = null;
            }
        });
    }
    printList(isComplete = true, isCheck = false) {
        console.log();
        this.taskList.forEach((task, i) => {
            const colorIndex = `${++i}`.green;
            const taskState = task.checkDate
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (isComplete || !!task.checkDate === !!isCheck)
                console.log(
                    `${colorIndex}. ${task.description} :: ${taskState}`
                );
        });
    }
}

module.exports = Tasks;
