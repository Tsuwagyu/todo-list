import { todo } from "./todoModule.js";
import { Project, projectManager } from "./projectModule.js";
import { storage } from "./storageModule.js";
import { domManager } from "./domModule.js";
import { archiveManager } from "./archiveModule.js";
import "./styles.css";

const loadedArchives = storage.loadArchives();
archiveManager.archivedTasks = loadedArchives;
const loadedProjects = storage.loadProjects();

if (loadedProjects.length > 0) {
    projectManager.projectCollection = loadedProjects;

} else {
    projectManager.add('Inbox');
}




domManager.todoAdd();
domManager.gatherFormData();

storage.saveProjects(projectManager.projectCollection);
domManager.projectAdd();
domManager.renderProjects();
domManager.archiveSetup();

