import { todo } from "./todoModule.js";
import { Project, projectManager } from "./projectModule.js";
import { storage } from "./storageModule.js";

const loadedProjects = storage.load();

if (loadedProjects.length > 0) {
    projectManager.projectCollection = loadedProjects;
    console.log("sweet, here's the loaded projects!", projectManager.projectCollection);

} else {
    console.log("No data found, initializing default inbox.");
    projectManager.add('Inbox');
}