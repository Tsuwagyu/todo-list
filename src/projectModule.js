export class Project {

    constructor(name) {
        this.name = name;
        this.todoHolder = [];
    }
}

const projectManager = {

    projectCollection = [],

    add(name) {
        const newProject = new Project(name);
        this.projectCollection.push(newProject);
        return newProject;   
    },

    remove(name) {
        const index = this.projectCollection.findIndex(project => project.name === name);
        this.projectCollection.splice(index, 1);
    },

    get(project) {

    }
}