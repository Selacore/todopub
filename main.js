const taskInput = document.querySelector('.new-todo');
const todosWrapper = document.querySelector('.todo-list');
let taskcounter = document.querySelector('.todo-count strong');




let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

taskcounter.textContent = tasks.length;


let todoElems = [];


function Task(newtodo) { 
    this.newtodo = newtodo;
    this.completed = false;
}
const createTemplate = (task, index) => {
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

insertHtml();


tasks.reduce((acc, item) => {
   
    count =  acc + item.completed;
    return  count;
    }, 0)
taskcounter.textContent = tasks.length - count;




const updateLocalStorage = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
    }

const completeTask = index => {
tasks[index].completed = !tasks[index].completed;
if(tasks[index].completed) {
    todoElems[index].classList.add('completed');
} else {
    todoElems[index].classList.remove('completed');
    
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
    taskcounter.textContent = tasks.length;
    updateLocalStorage();
    insertHtml();
}



document.querySelector('.filters').addEventListener('click', event => {
 let result = [];
 result = event.target.dataset.filter;
 result = tasks.filter(() => { 
     if (tasks.completed) { 
        
     }
    
 })
});


