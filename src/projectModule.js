export class Project {

    constructor(name) {
        this.name = name;
        this.todoHolder = [];
        console.log('project constructor has ran!');
    }

    test() {
        console.log('project class has ran!');
    }

    removeTodo(id) {
        const index = this.todoHolder.findIndex(todo => todo.id === id);
        this.todoHolder.splice(index, 1);
        console.log(`removeToDo has ran!`);
    }
}

export const projectManager = {

    projectCollection: [],

    add(name) {
        const newProject = new Project(name);
        this.projectCollection.push(newProject);
        console.log('add method ran!')
        return newProject;   
    },

    remove(name) {
        const index = this.projectCollection.findIndex(project => project.name === name);
        this.projectCollection.splice(index, 1);
        console.log('remove method ran!');
    },
 

}
