
import { createProject } from "./projectModule";
import { toDo } from "./todoModule";
import { initLayout, renderSidebar } from "./domModule";

let allProjects = [];
let currentProjectIndex = 0;

function init() {

    initLayout();

    // load data from storage here
    //const storedProjects = loadFromStorage();

    if(allProjects.length === 0) {
        const inbox = createProject("Inbox");
        allProjects.push(inbox);
    }

    renderSidebar(allProjects);

    //initial render, prior to changes
    //renderSideBar(allProjects);
    //renderTasks(allProjects[currentProjectIndex]);

    bindEvents();
}

//event handlers and tab switching

function projectSwitchHandler(index) {
    currentProjectIndex = index;
    //renderTasks(allProjects[currentProjectIndex]);
}
//new task inside active project
function handleAddProject(projectName) {
    const newProject = createProject(projectName);
    allProjects.push(newProject);
    //saveToStorage(allProjects);
    //renderSidebar(allProjects);
}

function handleAddTask(title, description, date, priority) {
    const activeProject = allProjects[currentProjectIndex];

    const newTask = createToDo(title, description, date, priority);
    activeProject.addTask(newTask);
}

function bindEvents() {

}

init();