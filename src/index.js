import { todo } from "./todoModule.js";
import { Project, projectManager } from "./projectModule.js";
import { storage } from "./storageModule.js";
import { domManager } from "./domModule.js";
import "./styles.css";



const loadedProjects = storage.load();

if (loadedProjects.length > 0) {
    projectManager.projectCollection = loadedProjects;
    console.log("sweet, here's the loaded projects!", projectManager.projectCollection);

} else {
    console.log("No data found, initializing default inbox.");
    projectManager.add('Inbox');
}




domManager.todoAdd();
domManager.gatherFormData();

storage.save(projectManager.projectCollection);
domManager.projectAdd();
domManager.renderProjects();

