import {projectFactory} from './projects.js'
import {toDoFactory} from './toDo.js'

const projectContainer = document.getElementById('projectContainer');
const todoContainer = document.getElementById('todoContainer');
const todoInput = document.getElementById('todoInput');
const todoTextField = document.getElementById('todoText');
const todoPriorityField = document.getElementById('todoPriority');
const submitBtn = document.getElementById('formBtn');

let projects = new Array();
let projectToAddTo; // project to store a new todo in
let activeObject; // Storing project that is currently on display

// Displaying projects on a page
function displayProject(name, id) {

    let proj = document.createElement('div');
    proj.innerHTML = name;
    proj.id = id;
    proj.onclick = function () {        
        displayAllTodos(projects[this.id]);
        console.log(this.id);
        projectToAddTo = projects[this.id];
        
    };
    
    proj.classList.add('project');
    const projButtons = document.createElement('div');
    projButtons.classList.add('projectButtons');

    const editBtn = document.createElement('button');
    editBtn.classList.add('projBtn');
    editBtn.innerHTML='edit';
    editBtn.onclick = function(){   
        let prompter = prompt('Enter Project Name:', "max 12 symbols");
        while (prompter.length > 13){
            prompter = prompt('Too many symbols', 'max 13 symbols');
        } 
        proj.textContent = prompter;   
        proj.appendChild(projButtons);      
    }
    
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('projBtn');
    deleteBtn.innerHTML='delete';
    deleteBtn.onclick= function(){
        projects.splice(id, 1);
        proj.remove();
        let p = document.getElementsByClassName('project');
        for (let i=0; i<projects.length; i++){
            projects[i].setId = i;  
            p[i].id = i;     
        }
        
        
    }

    //Displays todo form and sets project into which the ToDo will be added to.
    const addToDoBtn = document.createElement('button');
    addToDoBtn.classList.add('projBtn');
    addToDoBtn.innerHTML='add ToDo';
    addToDoBtn.onclick=function(){

        projectToAddTo = projects[this.parentNode.parentNode.id];
        todoInput.classList.toggle('visibility');
    }

    projButtons.appendChild(editBtn);
    projButtons.appendChild(deleteBtn);
    projButtons.appendChild(addToDoBtn);
    proj.appendChild(projButtons);
    projectContainer.appendChild(proj);
    
}

function projAdder() {
    console.log(projects); //Remove
    let prompter = prompt('Enter Project Name:', "max 12 symbols");
    while (prompter.length > 13){
        prompter = prompt('Too many symbols', 'max 13 symbols');
    } 
    const newProj = new projectFactory(prompter, projects.length);
    projects.push(newProj);
    displayProject(newProj.name, newProj.id);     
}

//ToDo: Move all storage to seperate file
function storeAll() {
    localStorage.clear();
    for(let i=0; i<projects.length; i++){     
        storeLocal(projects[i].id, projects[i]);
    }
}

window.onbeforeunload = function() {
    storeAll();
}

function storeLocal(id, item){
    localStorage.setItem(id, JSON.stringify(item));
}

(function displayFromLocal(){
    for(let i = 0; i < localStorage.length; i++) {
        let item = JSON.parse(localStorage.getItem(i));
        let itemTodos = item.toDoArray;
        const loadedProj= new projectFactory (item.name, item.id);
        for (let i = 0; i<itemTodos.length; i++){
            const loadedToDo = new toDoFactory(itemTodos[i].text, itemTodos[i].priority, itemTodos[i].id, itemTodos[i].completed);
            loadedProj.addTodo(loadedToDo);
        }
        displayProject(loadedProj.name, loadedProj.id);
        projects.push(loadedProj);
    }
})();

// displays all todos in todo container
function displayAllTodos(currentProject) {
    if (activeObject === currentProject){
        return;
    } else {
        activeObject = currentProject;
        var elements = document.getElementsByClassName('todoItem');
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        console.log(currentProject.toDoArray);
        
        currentProject.toDoArray.forEach(todo => {
            displayTodo(todo, todo.id, todo.completed);
        });        
    }
}


// Creates and displays a single todo
function displayTodo(todo, toDoId, completed){
    const todoDisplay = document.createElement('div');
    todoDisplay.classList.add('todoItem');
    if (todo.getPriority === "2"){
        todoDisplay.style.borderColor = '#04fad9';
    } else if (todo.getPriority === "3"){
        todoDisplay.style.borderColor = 'rgb(255, 0, 0)';
    }

    const innerTodoText = document.createElement('div');
    innerTodoText.classList.add('todoText');
    innerTodoText.innerHTML = todo.getText;

    const todoEdit = document.createElement('button');
    todoEdit.innerHTML= 'Delete';
    todoEdit.classList.add('projBtn2');
    todoEdit.onclick = function(){      
        projectToAddTo.removeTodo(toDoId);
        todoDisplay.remove();
    }

    const todoComplete = document.createElement('button');
    todoComplete.innerHTML= 'Complete';
    todoComplete.classList.add('projBtn2');
    todoComplete.onclick = function() {
        completer();
    }

    function completer() {
        todo.setCompleted = true;
        todoDisplay.classList.add('completed');
        todoComplete.disabled = true;
        todoComplete.style.backgroundColor = 'grey';
    }

    todoDisplay.appendChild(innerTodoText);
    todoDisplay.appendChild(todoEdit);
    todoDisplay.appendChild(todoComplete);
    todoContainer.appendChild(todoDisplay);

    if (completed){
        completer();
    }

    
}

//Create ToDo from user input and add it to current project
function addToDo(){
    let toDoId = projectToAddTo.getTodos.length;
    const newToDo = new toDoFactory(todoTextField.value, todoPriorityField.value, toDoId);
    projectToAddTo.addTodo(newToDo);
    todoTextField.value ="";
    todoInput.classList.toggle('visibility');
    displayTodo(newToDo, toDoId); 
}

submitBtn.onclick = addToDo;


export {displayProject, projAdder}