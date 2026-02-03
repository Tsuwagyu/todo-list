import { todo } from "./todoModule.js";
import { Project } from "./projectModule.js";
import { projectManager } from "./projectModule.js";

// call projectManager for inbox default
const inbox = projectManager.add('Inbox');
const milk = new todo('Get milk', 'from the store', '2024-01-15', 'low', '');
inbox.todoHolder.push(milk);

console.log(inbox);


function save(){
    let projectManagerRef = projectManager.projectCollection
    JSON.stringify(projectManagerRef);
    localStorage.setItem('projectManagerRef', jsonString);
}

function load() {
    localStorage.getItem('projectManagerRef');
    JSON.parse(projectManagerRef);
}



