export class todo {


    constructor(title, description, dueDate, priority, notes, id = crypto.randomUUID(), completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
        this.id = id;

    }

    todoStatus() {
        this.completed = !this.completed;
    }

    priorityChanger(newPriority) {
        this.priority = newPriority;
    }

    changeDate(date) {
        this.dueDate = date;
    }

    test() {
        console.log('todo activated!');
    }



}


