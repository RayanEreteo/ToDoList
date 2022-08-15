//UPPERCASE COMMENT -- Category
//lowercase comment -- Important Line explanation


//VARIABLE DECLARATION
//get important html element
let button = document.querySelector('#add');
let muteButton = document.querySelector(".mute-btn");
let mobileMuteButton = document.querySelector(".mobile-mute-btn");
let inputField = document.querySelector('#input');
let list = document.querySelector(".list");
let mobileOptionsList = document.querySelector(".mobile-nav-button--default");
let optionsButton = document.querySelector("#show_options");
let blackLayer = document.querySelector(".defaultLayer");
//declare a variable that contain a sound
let audio = new Audio("./SOUND/ajout.wav");
//boolean to check if the sound is muted
let isMuted = false;

// Create an infinite interval of 249ms to call the funtion 'checkScreenSize'

setInterval(checkScreenSize, 249);

// EVENT LISTENERS
button.addEventListener('click', AddToDo);
list.addEventListener('click', deleteCheck);

muteButton.addEventListener('click', toggleMute);
mobileMuteButton.addEventListener('click', toggleMute);
optionsButton.addEventListener('click', toggleOptions);


// FUNCTIONS

// Function to add a task
function AddToDo(event){
    event.preventDefault();
    if(inputField.value.length > 0){
        //make a div of the item
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("tache");
        //make item
        const newTodo = document.createElement("li");
        newTodo.innerText = inputField.value;
        newTodo.classList.add("tache-item");
        todoDiv.appendChild(newTodo);
        //Add 'Completed' and 'Delete' button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        //Add the item to the to-do list
        list.appendChild(todoDiv);
        //Clear the input
        inputField.value = "";
        //Play the sound
        audio.play();
    }
}

function deleteCheck(e){
    const item = e.target;
    //Delete task
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function (){
            todo.remove();
        })
    }
    //Make task in the 'Completed' state 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//Function to mute audio

function toggleMute(){
  //Check if the 'isMuted' variable is false or true
  if (!isMuted) {
    //If the variable has the value false then we change the logo and we change the boolean to true by setting the sound to 0
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    mobileMuteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    isMuted = true;
    audio.volume = 0;
  } else {
    //If the variable has the value true then we change the logo and we change the boolean to false by setting the sound to 0.5
    isMuted = false;
    muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    mobileMuteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    audio.volume = 0.5;
  }
}

//Functions to toggle the appearance of the options menu for mobile

function toggleOptions(){
    blackLayer.classList.toggle('black-layer');
    mobileOptionsList.classList.toggle("mobile-nav-button");
}

//Functions call above to check window width

function checkScreenSize(){
    //Declare a variable that contain the screen width
    let screenWidth = window.innerWidth;
    //Check if screen width is superior or equal to 752px
    if(screenWidth >= 752){
        blackLayer.className = 'defaultLayer';
        mobileOptionsList.className = "mobile-nav-button--default";
    }
}