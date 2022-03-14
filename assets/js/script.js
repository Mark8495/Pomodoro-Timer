// Settings Modal taken from W3 Schools
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openSettings");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// ---------------------------------------Pomodoro Timer
// selectors
let startButton = document.getElementsByClassName('startButton')
let start = document.getElementById('start')
let reset = document.getElementById('reset')
let soundChoice = document.getElementById('sounds')

let pomoL = document.getElementById('pomoLength')
let breakL = document.getElementById('breakLength')
let timerMin = document.getElementById('timerMin')
let timerSec = document.getElementById('timerSec')
let pomoButton = document.getElementById('submitPomoL')
let breakButton = document.getElementById('submitBreakL')
let workMode = document.getElementById('workMode')
let breakMode = document.getElementById('breakMode')
let startTimer;
let pomoLTime = 25
let breakLTime = 5
let counter = 1;
let backCounter = 1;
let remainSeconds = pomoLTime * 60
let audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-classic-alarm-995.wav')


// event Listeners
// When user clicks the start button
start.addEventListener('click', function () {

    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000)
        start.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        clearInterval(startTimer)
        startTimer = undefined
        start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    }

    remainSeconds--
})

soundChoice.addEventListener('change', soundPlay)

// When user clicks on the + button for the work timer
pomoButton.addEventListener('click', function () {
    pomoLTime = pomoL.value
    if (pomoLTime < 1 || pomoLTime > 60) {
        alert('Time length not valid, Please input a time between 5 and 60')
        pomoLTime = 25
    }
    remainSeconds = (pomoLTime * 60) 
    timerMin.textContent = pomoLTime
    pomoL.value = '';
    pomoL.placeholder = pomoLTime
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()
})
// When user clicks on the + button for the break timer
breakButton.addEventListener('click', function () {
    breakLTime = breakL.value
    if (breakLTime < 5 || breakLTime > 60) {
        alert('Time length not valid, Please input a time between 5 and 60')
        breakLTime = 5
    }
    breakL.value = ''
    breakL.placeholder = breakLTime
    workReset()
    timerMin.textContent = pomoLTime
})
// When the user clicks on the reset button
reset.addEventListener('click', function () {
    timerMin.textContent = pomoLTime
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    timerSec.textContent = '00'
    remainSeconds = pomoLTime * 60
    workReset()
})

// When the user clicks on the work header
workMode.addEventListener('click', function () {
    remainSeconds = pomoLTime * 60
    timerMin.textContent = pomoLTime
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()

})
// When the user clicks on the break header
breakMode.addEventListener('click', function () {
    remainSeconds = breakLTime * 60
    timerMin.textContent = breakLTime
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()
    workMode.classList.remove('active')
    breakMode.classList.add('active')
    switchColour()

})




// Functions
// Reset Function
function workReset() {
    // Resets everything to default
    breakMode.classList.remove('active')
    workMode.classList.add('active')
    clearInterval(startTimer)
    startTimer = undefined
    start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    timerSec.textContent = '00'
    document.body.classList.remove('switch-colour-blue')
    document.body.classList.add('switch-colour-red')
    document.getElementById('timerP').classList.remove('font-white')
    document.getElementById('mode').classList.remove('font-white')
}

// Main function for the timer
function timer() {
    timerSec.textContent = ((remainSeconds % 60))
    timerMin.textContent = Math.floor(remainSeconds / 60)
    remainSeconds--;
    if (timerSec.textContent <= 9) {
        timerSec.textContent = `0${timerSec.textContent}`
    }
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    if (remainSeconds == -1 && backCounter != 0) {
        timerSec.textContent = '00'
        audio.play()
        alert('Good Work, You deserve a break!')
        remainSeconds = breakLTime * 60
        backCounter--;
        workMode.classList.remove('active')
        breakMode.classList.add('active')
        switchColour()
    } else if (remainSeconds == -1 && backCounter == 0) {
        timerSec.textContent = '00'
        audio.play()
        remainSeconds = (pomoLTime * 60) 
        breakMode.classList.remove('active')
        workMode.classList.add('active')
        backCounter++;
        if (counter == 1) {
            alert(`You have finished ${counter} cycle. Keep going you are doing great!`)
        } else {
            alert(`You have finished ${counter} cycles. Keep going you are doing great!`)
        }
        document.body.classList.remove('switch-colour-blue')
        document.body.classList.add('switch-colour-red')
        document.getElementById('timerP').classList.remove('font-white')
        document.getElementById('mode').classList.remove('font-white')
        counter++;
    }
}
// function to play alarm sounds
function soundPlay() {
    switch (soundChoice.value) {
        // Sounds taken from Mixkit.com
        case 'rooster':
            audio.pause()
            audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-rooster-crowing-in-the-morning-2462.wav')
            audio.play()
            break;
        case 'alarm':
            audio.pause()
            audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-classic-alarm-995.wav')
            audio.play()
            break;
        case 'short-alarm':
            audio.pause()
            audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-classic-short-alarm-993.wav')
            audio.play()
            break;
        case 'sci-alarm':
            audio.pause()
            audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-space-shooter-alarm-1002.wav')
            audio.play()
            break;
    }

}
// function to switch colors of background and timer
function switchColour() {
    document.body.classList.remove('switch-colour-red')
    document.body.classList.add('switch-colour-blue')
    document.getElementById('timerP').classList.add('font-white')
    document.getElementById('mode').classList.add('font-white')
}






// --------------------------------------- Task List




// Selectors

const taskInput = document.querySelector('.task-input')
const taskButton = document.querySelector('.task-button')
const taskList = document.querySelector('.task-list')
const taskFilter = document.querySelector('.filter-tasks')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTasks)
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteCheck)
taskFilter.addEventListener('change', filterTask)

// Functions
function addTask(e) {
    e.preventDefault();
    if (taskInput.value !== '') {
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
        // create task Li
        const newTask = document.createElement('li')
        newTask.innerText = taskInput.value
        taskDiv.appendChild(newTask)
        // add task to local Storage
        saveLocalTasks(taskInput.value)
        // add finish button
        const finishedButton = document.createElement('button')
        finishedButton.innerHTML = '<i class="fas fa-check"></i>'
        finishedButton.classList.add('finish-btn')
        taskDiv.appendChild(finishedButton)

        // add delete button
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
        deleteButton.classList.add('delete-btn')
        taskDiv.appendChild(deleteButton)
        // append to list
        taskList.appendChild(taskDiv)

        // clear value
        taskInput.value = ""
    }

}
console.log(localStorage)

function deleteCheck(e) {
    const item = e.target
    if (item.classList[0] === 'delete-btn') {
        const task = item.parentElement;
        removelocaltask(task)
        task.classList.add('fall')
        task.addEventListener('transitionend', function () {
            task.remove()
        })

    }

    if (item.classList[0] === 'finish-btn') {
        const task = item.parentElement;
        task.classList.toggle('finished')
    }
}

function filterTask(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function (task) {
        const mStyle = task.style;
        if (mStyle != undefined && mStyle != null) {
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "done":
                    if (task.classList.contains('finished')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "todo":
                    if (task.classList.contains('finished')) {
                        mStyle.display = 'none';
                    } else {
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

function saveLocalTasks(task) {
    // check if old tasks
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        // create task Li
        const newTask = document.createElement('li');
        newTask.innerText = task
        taskDiv.appendChild(newTask)

        // add finish button
        const finishedButton = document.createElement('button');
        finishedButton.innerHTML = '<i class="fas fa-check"></i>';
        finishedButton.classList.add('finish-btn');
        taskDiv.appendChild(finishedButton);

        // add delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-btn');
        taskDiv.appendChild(deleteButton);
        // append to list
        taskList.appendChild(taskDiv);

    })

}

function removelocaltask(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}