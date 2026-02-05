import { todo } from "./todoModule.js";
import { Project, projectManager } from "./projectModule.js";
import { storage } from "./storageModule.js";
import { domManager } from "./domModule.js";



const loadedProjects = storage.load();

if (loadedProjects.length > 0) {
    projectManager.projectCollection = loadedProjects;
    console.log("sweet, here's the loaded projects!", projectManager.projectCollection);

} else {
    console.log("No data found, initializing default inbox.");
    projectManager.add('Inbox');
}

// const inbox = projectManager.add('Inbox');
// const work = projectManager.add('Work');
// const milk = new todo('Get milk', 'from store', '2024-01-15', 'low', '');
// inbox.todoHolder.push(milk);

storage.save(projectManager.projectCollection);
console.log(projectManager.projectCollection);
localStorage.clear();

domManager.renderProjects();