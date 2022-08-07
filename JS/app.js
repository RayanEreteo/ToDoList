//Declaration des variables
let button = document.querySelector('#add');
let muteButton = document.querySelector(".mute-btn");
let mobileMuteButton = document.querySelector(".mobile-mute-btn");
let inputField = document.querySelector('#input');
let list = document.querySelector(".list");
let mobileOptionsList = document.querySelector(".mobile-nav-button--default");
let audio = new Audio("./SOUND/ajout.wav");
let isMuted = false;
let optionsButton = document.querySelector("#show_options");
let blackLayer = document.querySelector('.defaultLayer');

// Creer un interval pour vérifier la largeur de la fenetre

setInterval(checkScreenSize, 249);

// Ecouteurs
button.addEventListener('click', AddToDo);
list.addEventListener('click', deleteCheck);

muteButton.addEventListener('click', toggleMute);
mobileMuteButton.addEventListener('click', toggleMute);

optionsButton.addEventListener('click', toggleOptions);


// Fonctions

// Fonction pour ajouter une tâche
function AddToDo(event){
    event.preventDefault();
    if(inputField.value.length > 0){
        //créer la boite de l'item
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("tache");
        //créer l'item
        const newTodo = document.createElement("li");
        newTodo.innerText = inputField.value;
        newTodo.classList.add("tache-item");
        todoDiv.appendChild(newTodo);
        //Ajouter le bouton 'completer' et 'supprimer'
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        //Ajouter la boite a la list 'ul'
        list.appendChild(todoDiv);
        // Vider le champ de caractères
        inputField.value = "";
        //jouer le son
        audio.play();
    }
}

function deleteCheck(e){
    const item = e.target;
    //Effacer la tache
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function (){
            todo.remove();
        })
    }
    // Tache éfféctué 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

// Fonctions pour muter ou remettre le son

function toggleMute(){
    //Verifier si la variable 'isMuted' est faux ou vraie
    if(!isMuted){
        //Si la variable a la valeur faux alors on change le logo est on change la boolean en vrai en mettant le son a 0
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        mobileMuteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        isMuted = true;
        audio.volume = 0;
    }else{
        //Si la variable a la valeur vrai alors on change le logo est on change la boolean en faux en mettant le son a 0.5
        isMuted = false;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        mobileMuteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        audio.volume = 0.5;
    }
}

// Fonctions pour basculer l'apparition du menu options pour mobile

function toggleOptions(){
    blackLayer.classList.toggle('black-layer');
    mobileOptionsList.classList.toggle("mobile-nav-button");
}

//fonctions appelez plus haut pour vérifier la largeur de la fenêtre

function checkScreenSize(){
    let screenWidth = window.innerWidth;
    if(screenWidth >= 752){
        blackLayer.className = 'defaultLayer';
        mobileOptionsList.className = "mobile-nav-button--default";
    }
}