class toDoFactory {
    constructor(text, priority, id, completed){
        this.text=text;
        this.priority=priority;
        this.id = id;
        this.completed = completed;

    }
    get getText(){
        return this.text;
    }
    set setText(newText){
        this.text=newText;
    }
    get getPriority(){
        return this.priority
    }
    set setPriority(newPriority){
        this.priority=newPriority;
    }
    
    set setId(id){
        this.id = id;
    }

    set setCompleted(cmpl){
        this.completed = cmpl;
    }
}

export {toDoFactory}