export class todo {


    constructor(title, description, dueDate, priority, notes, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }

    todoStatus() {
        this.completed = !this.completed;
    }

    test() {
        console.log('todo activated!');
    }



}


