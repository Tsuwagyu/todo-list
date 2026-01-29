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
    }

    remove(project) {}

    get(project) {}
}