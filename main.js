const taskInput = document.querySelector('.new-todo');
const todosWrapper = document.querySelector('.todo-list');
let taskcounter = document.querySelector('.todo-count strong');
let i=0;

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoElems = [];

function Task(newtodo) { 
    this.newtodo = newtodo;
    this.completed = false;
}
const createTemplate = (task, index) => {
    i++;
    taskcounter.textContent = i;
    return `
            <li data-id="" class= "${task.completed ? 'completed' : ''}">
                    <div class="view">
                    <input onchange="completeTask(${index})" class="toggle" type="checkbox">
                    <label> ${task.newtodo} </label>
                    <button onclick="deleteTask(${index})" class="destroy"></button>
                    </div>
            </li>
    `
    
    
}
const insertHtml = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => { 
            todosWrapper.innerHTML += createTemplate(item, index)
        })
        todoElems = document.querySelectorAll('.todo-list li');
    }
}
const updateLocalStorage = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
    }

const completeTask = index => {
tasks[index].completed = !tasks[index].completed;
if(tasks[index].completed) {
    todoElems[index].classList.add('completed');
    i--;
    taskcounter.textContent = i;
} else {
    todoElems[index].classList.remove('completed');
    i++;
    taskcounter.textContent = i;
}
updateLocalStorage();
insertHtml();
}

taskInput.addEventListener('keydown', (e) => {
    if (taskInput.value === '') return;
    if (e.keyCode === 13) {
    tasks.push(new Task(taskInput.value));
    updateLocalStorage();
    insertHtml();
    taskInput.value = '';
    } 
})

const deleteTask = index => {
    tasks.splice(index, 1);
    i--;
    taskcounter.textContent = i;
    updateLocalStorage();
    insertHtml();
}

