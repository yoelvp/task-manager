'use strict';

const formTasks = document.getElementById('formTasks');

formTasks.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleTask = document.getElementById('inputTitle').value;
    const dateTask = document.getElementById('inputDate').value;

    const tasks = {
        titleTask,
        dateTask
    }

    if(localStorage.getItem('tasks') === null) {
        const newTask = [];
        newTask.push(tasks);
        localStorage.setItem('tasks', JSON.stringify(newTask));
    } else {
        const newTasks = JSON.parse(localStorage.getItem('tasks'))
        newTasks.push(tasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    formTasks.reset();
});

const getTasks = () => {
    const printTasks = document.getElementById('printTasks');
    const getTasks = JSON.parse(localStorage.getItem('tasks'));

    printTasks.innerHTML = '';

    for(let i = 0; i < getTasks.length; i++) {
        let title = getTasks[i].titleTask;
        let date = getTasks[i].dateTask;

        printTasks.innerHTML += `
            <div class="tasks__info">
                <div class="tasks__header">
                    <h4 class="tasks__header-title"><i class="far fa-dot-circle"></i> ${title}</h4>
                    <p><small>${date}</small></p>
                </div>
                <hr class="line2">
                <div class="tasks__body">
                    <a class="tasks__body-delete" onClick="deleteTasks('${title}')"><i class="fas fa-trash-alt"></i> Eliminar</a>
                    <input type="checkbox">
                </div>
            </div>
        `;
    }
}

const deleteTasks = (title) => {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].titleTask == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();