// DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners(){
    // DOM load event - get tasks on loading
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task form
    form.addEventListener('submit', addTask);

    // Delete task - using event delegation
    taskList.addEventListener('click', removeTask);

    // Clear all tasks 
    clearBtn.addEventListener('click', clearTasks);

    // Filter through tasks
    filter.addEventListener('keyup', filterTask);
}

// GET TASKS AFTER LOADING
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li')
        // Add class to element
        li.className = 'collection-item';
        // Create a text node & append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        console.log(li)

        // Append the new element to the ul
        taskList.appendChild(li);

    })
}

// ADD TASK
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    } else {

        // Create li element
        const li = document.createElement('li')
        // Add class to element
        li.className = 'collection-item';
        // Create a text node & append to li
        li.appendChild(document.createTextNode(taskInput.value));

        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        console.log(li)

        // Append the new element to the ul
        taskList.appendChild(li);

        // Store in local storage
        storeTask(taskInput.value);

        // Clear the input
        taskInput.value = '';

    }
    
    e.preventDefault();
}

// STORE TASK IN LOCAL STORAGE
function storeTask(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// DELETE FROM LOCAL STORAGE
function removeStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// REMOVE TASK
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            const taskDeleted = e.target.parentElement.parentElement;
            taskDeleted.remove();

            // Remove from Local storage
            removeStorage(taskDeleted);
        }
    }
}


// CLEAR TASKS
function clearTasks(){
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
            }
    }

    // Clear from local storage
    clearFromStorage();
}

// CLEAR TASKS FROM LOCAL S.
function clearFromStorage(){
    localStorage.clear();
}

// FILTER TASKS
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });

}