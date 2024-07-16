const addBtn = document.querySelector('.btn-send');
const deleteBtn = document.querySelector('.btn-delete');
const resetBtn = document.getElementById('reset');
const noBtn = document.getElementById('no-btn');

const inputArea = document.querySelector('.chore-box')
const error = document.querySelector('.error')
const taskArea = document.getElementById('task-container');
const createdTask = document.getElementById('task');
const modal = document.getElementById('modal');

let tasksArray = [];
let items = '';
deleteBtn.disabled = true;
addBtn.disabled = true;

addBtn.addEventListener('click', () => { addTask(createdTask);});
deleteBtn.addEventListener('click', () => { removeAllTasks();});
resetBtn.addEventListener('click', () => { reloadList();});

inputArea.addEventListener('input', () => { enableButtons();})

// Get items from localStorage

retrieveStoredItems();

// Add items and save them to localStorage

function addTask() {

    inputArea.value = inputArea.value.toLowerCase();

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

    // Modal pop up

    taskArea.innerHTML = `<div id='modal' class='modal'>Would you like to remove ALL
                         chores?<button id='yes-btn' class='yes-btn btn-confirmation'>YES</button>
                         <button id='no-btn' class='no-btn btn-confirmation'>NO</button></div>
                         `

    document.getElementById('no-btn').addEventListener('click', function() {
        document.getElementById('modal').classList.add('hide');
        document.getElementById('no-btn').classList.add('hide');
        document.getElementById('yes-btn').classList.add('hide');
    })
    
    document.getElementById('yes-btn').addEventListener('click', function() {
        tasksArray = [];
        renderTasks();
        inputArea.value = ''
        localStorage.clear();
        taskArea.innerHTML = `<img src="images/giphy.webp" />
                            <h2 class='congratulations'>Great Job!  You've finished all of your tasks!!</h2>
                            `
    resetBtn.classList.remove('hide');
    })
};   

// Remove individual tasks

function removeIndividualTask(index) {

    tasksArray.splice(index, 1)

    if( tasksArray.length === 0 ) {
        deleteBtn.disable = true;
        localStorage.clear();
    }
    console.log(deleteBtn.disable)
    renderTasks()
}


// Render items to browser

function renderTasks() {

    let taskItems = '';

    for( let i = 0; i < tasksArray.length; i++ ) {
        taskItems += `
            <li id='task' class="task created-task" data-task='task-container'>${tasksArray[i]}</li>
            `
    }
    taskArea.innerHTML = taskItems;

    const listItems = document.querySelectorAll(".created-task");

    listItems.forEach((item, index) => {
        item.addEventListener("dblclick", function() {
            removeIndividualTask(index);
        })
    })
}


// Conditionally disable/enable buttons

function enableButtons() {

    // Enable delete button if tasks are present

    if( tasksArray.length === 0 ) {
        deleteBtn.disabled = true;
    } else { 
        deleteBtn.disabled = false;
    }

    if( inputArea.value ) {
        addBtn.disabled = false;

        // Added 'Enter' functionality

        inputArea.addEventListener('keypress', function(e) {

        if( e.key === 'Enter' ) {
            e.preventDefault();
            addBtn.click();
            enableButtons();
        }
        })
    } else {
        addBtn.disabled = true;
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