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
const project1 = projectManager.add('Today');
const project2 = projectManager.add('Upcoming');
const project3 = projectManager.add('Later');
const todoExample = new todo('Gym for 1 hour', 'HealthQuest', 'Today', 'High');
const todoExample2 = new todo('Kettlebells', '', 'Today', 'High', '30 minutes' );
const todoExample3 = new todo('Groceries', 'Baking stuff', 'Tomorrow', 'Low');
const todoExample4 = new todo('Car', 'Oil change', '2-10-2026', 'High', 'in Flemington');
project1.todoHolder.push(todoExample, todoExample2);
project2.todoHolder.push(todoExample3);
project3.todoHolder.push(todoExample4);

// const milk = new todo('Get milk', 'from store', '2024-01-15', 'low', '');
// inbox.todoHolder.push(milk);

storage.save(projectManager.projectCollection);
console.log(projectManager.projectCollection);
localStorage.clear();
localStorage.clear();

domManager.renderProjects();