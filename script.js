const addBtn = document.querySelector('.btn-send');
const deleteBtn = document.querySelector('.btn-delete');
const inputArea = document.querySelector('.chore-box')
const error = document.querySelector('.error')
const taskArea = document.getElementById('task-container');
const createdTasks = document.querySelectorAll('.created-task');

let tasksArray = [];
let items = '';

addBtn.addEventListener('click', () => { addTask(createdTasks);});
deleteBtn.addEventListener('dblclick', () => { removeAllTasks ();});

inputArea.addEventListener('keypress', function(e) {
    if( e.key === 'Enter' ) {
        e.preventDefault();
        addBtn.click();
    }
})

retrieveStoredItems();

// Add items and save them to localStorage

function addTask() {

    if( !tasksArray.includes(inputArea.value) && inputArea.value ) {
            tasksArray.push(inputArea.value);
            renderTasks();
            inputArea.value = '';
    } else if( tasksArray.includes(inputArea.value) ) {
        error.innerHTML = `<div class='error'>Duplicates not allowed!</div>`
    } else {
        error.innerHTML = '';
    }

    // Limit items to 7

    if(tasksArray.length === 7 ) {
        addBtn.disabled = true;
        inputArea.disabled = true;
    }

    localStorage.setItem('myTasks', JSON.stringify(tasksArray))
}

// Remove all tasks

function removeAllTasks() {
    tasksArray = [];
    renderTasks();
    inputArea.value = ''
    localStorage.clear();
}


// Render items to browser

function renderTasks() {

    let taskItems = '';

    for( let i = 0; i < tasksArray.length; i++ ) {
        taskItems += `
            <li id='task' class="task created-task">${tasksArray[i]}</li>
            `
    }
    taskArea.innerHTML = taskItems;
}


// Retrieve stored items from localStorage and render them

function retrieveStoredItems() {
    
    if( localStorage.getItem('myTasks') ) {
        tasksArray = JSON.parse(localStorage.getItem('myTasks'));
        renderTasks();
    }
}