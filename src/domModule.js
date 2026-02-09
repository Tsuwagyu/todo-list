import { projectManager } from "./projectModule.js"
import { Project } from "./projectModule.js";
export const domManager = {

    sidebarRef: null,

    init: function() {
        this.sidebarRef = document.getElementById('project-sidebar');

    },
    

   createElement: function(tag, className, elementName = '') { 
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    element.textContent = elementName;
    return element;
   },
   
   renderProjects: function() {


    projectManager.projectCollection.forEach(project => {
        const projectBtn = this.createElement('button', 'project-btn', project.name);
        // const projectTodos = project.todoHolder;


        projectBtn.addEventListener('click', () => {
            this.renderTodos(project);

        }); 


        this.sidebarRef.appendChild(projectBtn);



    
    
    
    
    });



    



   },

   renderTodos: function (project) {
    
    const todoDisplay = document.getElementById('todo-display');
    todoDisplay.innerHTML = '';

    const currentProject = project.todoHolder

    currentProject.forEach(todo => {

        const todoCard = this.createElement('div', 'todo-card');
        const titleElement = this.createElement('h3', 'todo-title', todo.title);
        const descriptionElement = this.createElement('p', 'todo-description', todo.description)
        const dueDateElement = this.createElement('p','due-date-picker', todo.dueDate);
        const priorityElement = this.createElement('p', 'todo-priority', todo.priority);
        const notesElement = this.createElement('p', 'todo-notes', todo.notes);

        todoCard.appendChild(titleElement);
        todoCard.appendChild(descriptionElement);
        todoCard.appendChild(dueDateElement);
        todoCard.appendChild(priorityElement);
        todoCard.appendChild(notesElement);

        todoDisplay.appendChild(todoCard);
    





    })

   },

   projectAdd: function() {
    
    let addProjectBtn = document.getElementById('add-project-button');


    addProjectBtn.addEventListener('click', () => { 

        let newProjectPrompt = prompt('Add project name:');

        let newProject = projectManager.add(newProjectPrompt);

        let newProjectMade = this.createElement('button', 'project-btn', newProject.name);

        newProjectMade.addEventListener('click', () => {
            this.renderTodos(newProject);
        });

        this.sidebarRef.appendChild(newProjectMade);

        







    })

    


   },

}