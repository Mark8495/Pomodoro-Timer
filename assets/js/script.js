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


// Task List
// Task List Input button
let addTask = document.getElementById('addTask')
// The storage list for tasks
let taskList = document.getElementById('taskList')
// Task list Input field
let taskField = document.getElementById('taskField')

// The method to create the tasks
function createTask() {
    let task = document.createElement('li');
    task.classList.add('paragraph-styling');
    task.textContent = taskField.value;
    taskList.appendChild(task);
    taskField.value = '';
    task.addEventListener('click', function () {
        task.style.textDecoration = 'line-through'
    })
    task.addEventListener('dblclick', function () {
        taskList.removeChild(task);
    })
    
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        if (taskField.value == '') {
            return
        } else (
            createTask()
        )
    }
})
addTask.addEventListener('click', createTask)


// Pomodoro Timer
let startButton = document.getElementsByClassName('startButton')
let start = document.getElementById('start')
let reset = document.getElementById('reset')

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
let remainSeconds = 5


start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000)
        start.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
        clearInterval(startTimer)
        startTimer = undefined
        start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    }


})

function workReset(){
    breakMode.classList.remove('active')
    workMode.classList.add('active')
    clearInterval(startTimer)
    startTimer = undefined
    start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    timerSec.textContent = '00'
}

pomoButton.addEventListener('click', function () {
    pomoLTime = pomoL.value
    if (pomoLTime < 5 || pomoLTime > 60){
        alert('Time length not valid, Please input a time between 5 and 60')
        pomoLTime = 25
    }
    remainSeconds = pomoLTime * 60
    timerMin.textContent = pomoLTime 
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()
    // breakMode.classList.remove('active')
    // workMode.classList.add('active')
    // clearInterval(startTimer)
    // startTimer = undefined
    // start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    // timerSec.textContent = '00'
})

breakButton.addEventListener('click', function () {
    breakLTime = breakL.value
    if (breakLTime < 5 || breakLTime > 60){
        alert('Time length not valid, Please input a time between 5 and 60')
        breakLTime = 5
    }
    workReset()
    timerMin.textContent = pomoLTime
    // clearInterval(startTimer)
    // startTimer = undefined
    // start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    // timerSec.textContent = '00'
})

reset.addEventListener('click', function () {
    timerMin.textContent = pomoLTime 
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    timerSec.textContent = '00'
    remainSeconds = pomoLTime * 60
    workReset()
    // clearInterval(startTimer)
    // startTimer = undefined
    // breakMode.classList.remove('active')
    // workMode.classList.add('active')
    // start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
})
workMode.addEventListener('click', function () {
    remainSeconds = pomoLTime * 60
    timerMin.textContent = pomoLTime 
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()
    // breakMode.classList.remove('active')
    // workMode.classList.add('active')
    // clearInterval(startTimer)
    // startTimer = undefined
    // start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    // timerSec.textContent = '00'
})

breakMode.addEventListener('click', function () {
    remainSeconds = breakLTime * 60
    timerMin.textContent = breakLTime 
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    workReset()
    workMode.classList.remove('active')
    breakMode.classList.add('active')
    // clearInterval(startTimer)
    // startTimer = undefined
    // start.innerHTML = '<i class="fa fa-solid fa-play"></i>'
    // timerSec.textContent = '00'
})


function timer(){
    timerSec.textContent = ((remainSeconds % 60))
    timerMin.textContent = Math.floor(remainSeconds / 60)
    remainSeconds--;
    if (timerSec.textContent <= 9) {
        timerSec.textContent = `0${timerSec.textContent}`
    }
    if (timerMin.textContent <= 9) {
        timerMin.textContent = `0${timerMin.textContent}`
    }
    if(remainSeconds == -1 && backCounter != 0){
        alert('Good Work, You deserve a break!')
        remainSeconds = breakLTime 
        backCounter--;
        workMode.classList.remove('active')
        breakMode.classList.add('active')
    }else if(remainSeconds == -1 && backCounter == 0){
        remainSeconds = 5
        breakMode.classList.remove('active')
        workMode.classList.add('active')
        backCounter++;
        if(counter == 1){
            alert(`You have finished ${counter} cycle. Keep going you are doing great!`)
        }else{
            alert(`You have finished ${counter} cycles. Keep going you are doing great!`)
        }
        counter++;
    }
}