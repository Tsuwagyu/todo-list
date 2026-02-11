import { projectManager } from "./projectModule.js"
import { Project } from "./projectModule.js";
import { todo } from "./todoModule.js";
export const domManager = {

    sidebarRef: document.getElementById('project-sidebar'),

   createElement: function(tag, className, elementName = '') { 
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    element.textContent = elementName;
    return element;
   },
   
   renderProjects: function() {


    projectManager.projectCollection.forEach(project => {
        const projectBtn = this.createElement('button', 'project-btn', project.name);
        


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

    




    });

    


   },

   formReference: document.getElementById('form-container'),

   todoAdd: function() {

    let todoBtnRef = document.getElementById('add-todo-button');

    todoBtnRef.addEventListener('click', () => {

        this.formContainer.style.display = 'block';




        
    })

 // click button > display the todo > take in the 
    


    
   },

   gatherFormData: function() {

    const submitBtnRef = document.getElementById('todo-submit');

        submitBtnRef.addEventListener('click', (e) => {

            e.preventDefault();

            const formData = {

                todoTitle: document.getElementById('todo-title').value,

                todoDesc: document.getElementById('todo-description').value,

                todoDate: document.getElementById('todo-date').value,

                todoNotes: document.getElementById('todo-notes').value,

                todoCompletion: document.getElementById('todo-completion').value,

                todoFieldset: document.getElementById('todo-priority').value,
            }

            localStorage.setItem('userTodoFormData', JSON.stringify(formData));

            console.log(formData);



        })
    },


    





}