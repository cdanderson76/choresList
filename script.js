const addBtn = document.querySelector('.btn-send');
const deleteBtn = document.querySelector('.btn-delete');
const resetBtn = document.getElementById('reset');

const inputArea = document.querySelector('.chore-box')
const error = document.querySelector('.error')
const taskArea = document.getElementById('task-container');
const createdTasks = document.querySelectorAll('.created-task');

let tasksArray = [];
let items = '';
deleteBtn.disabled = true;

addBtn.addEventListener('click', () => { addTask(createdTasks);});
deleteBtn.addEventListener('dblclick', () => { removeAllTasks();});
resetBtn.addEventListener('click', () => { reloadList();});

// Added 'Enter' functionality

inputArea.addEventListener('keypress', function(e) {
    if( e.key === 'Enter' ) {
        e.preventDefault();
        addBtn.click();
        enableButtons();
    }
})

// Get items from localStorage

retrieveStoredItems();

// Add items and save them to localStorage

function addTask() {

    if( !tasksArray.includes(inputArea.value) && inputArea.value ) {
            tasksArray.push(inputArea.value);
            renderTasks();
            inputArea.value = '';
            enableButtons();
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

// Remove all tasks and allow restart

function removeAllTasks() {
    tasksArray = [];
    renderTasks();
    inputArea.value = ''
    localStorage.clear();
    taskArea.innerHTML = `<img src="images/giphy.webp" />
                          <h2 class='congratulations'>Great Job!  You've finished all of your tasks!!</h2>
                         `
    resetBtn.classList.remove('hide');
};   


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

function enableButtons() {
    if( tasksArray.length === 0 ) {
        deleteBtn.disabled = true;
    } else { 
        deleteBtn.disabled = false;
    }
}

// Start new list

function reloadList() {
    location.reload();
}


// Retrieve stored items from localStorage and conditionally render them

function retrieveStoredItems() {
    
    if( localStorage.getItem('myTasks') ) {
        tasksArray = JSON.parse(localStorage.getItem('myTasks'));
        deleteBtn.disabled = false;
        renderTasks();
    }
}