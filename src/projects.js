import {toDoFactory} from './toDo.js'

export class projectFactory{
  
    constructor(name, id) {
        this.name = name;
        this.id = id;  
        this.toDoArray = new Array();      
    }

    get getName(){
        return this.name;
    }
    get getId(){
        return this.id;
    }

    set setName(newName){
        this.name = newName;
    }

    set setId(newId){
        this.id = newId;
    }

    get getTodos(){
        return this.toDoArray;
    }

    addTodo(toDo) {
        this.toDoArray.push(toDo);
    }

    removeTodo(index) {
        this.toDoArray.splice(index,1);
        for(let i =0; i < this.toDoArray.length; i++){
            this.toDoArray[i].setId = i;            
        }
        
    }
}