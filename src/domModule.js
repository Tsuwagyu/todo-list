import { projectManager } from "./projectModule.js"
import { Project } from "./projectModule.js";
import { todo } from "./todoModule.js";
import { storage } from "./storageModule.js";
export const domManager = {

    sidebarRef: document.getElementById('project-sidebar'),

   createElement: function(tag, className, elementName = '') { 
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    element.textContent = elementName;
    return element;
   },
   
   renderProjects: function() {

    this.sidebarRef.innerHTML = '';

    
    
    projectManager.projectCollection.forEach(project => {
        const projectContainer = this.createElement('div', 'project-container'); 

        const projectBtn = this.createElement('button', 'project-btn', project.name);
        
        projectBtn.addEventListener('click', () => {
            this.currentProject = project;
            this.renderTodos(project);

        }); 
        const removeProjectBtn = this.createElement('button', 'remove-project-btn', 'X');

        removeProjectBtn.addEventListener('click', (e) => {

            
            
            projectManager.remove(project.name);

            storage.save(projectManager.projectCollection);

            this.renderProjects();

            

            
        });

        projectContainer.appendChild(projectBtn);
        projectContainer.appendChild(removeProjectBtn);
        this.sidebarRef.appendChild(projectContainer);

    
    });



    



   },

   renderTodos: function (project) {
    
    const todoDisplay = document.getElementById('todo-display');

    todoDisplay.innerHTML = '';
    todoDisplay.classList.remove('hidden-items');
    const currentProject = project.todoHolder

    currentProject.forEach(todo => {

        const todoCard = this.createElement('div', 'todo-card');
        const titleElement = this.createElement('h3', 'todo-title', todo.title);
        const descriptionElement = this.createElement('p', 'todo-description', todo.description)
        const dueDateElement = this.createElement('p','due-date-picker', todo.dueDate);
        const priorityElement = this.createElement('p', 'todo-priority', todo.priority);
        const notesElement = this.createElement('p', 'todo-notes', todo.notes);
        const deleteTodo = this.createElement('button', 'todo-delete', '✖');
        const editTask = this.createElement('button', 'todo-edit', 'edit');
        const todoCompletionToggle = this.createElement('input', 'todo-completion', '');
        const todoCompLabel = this.createElement('label', 'todo-completion-label', 'Done?');


        todoCompletionToggle.type = 'checkbox';
        todoCompletionToggle.id = 'todo-completion-id';

        todoCompLabel.htmlFor = 'todo-completion-id';
        todoCompLabel.textContent = 'Complete';

        todoCard.appendChild(todoCompletionToggle);
        todoCard.appendChild(todoCompLabel);
        todoCard.appendChild(editTask);
        todoCard.appendChild(deleteTodo);
        todoCard.appendChild(titleElement);
        todoCard.appendChild(descriptionElement);
        todoCard.appendChild(dueDateElement);
        todoCard.appendChild(priorityElement);
        todoCard.appendChild(notesElement);

        todoDisplay.appendChild(todoCard);

        deleteTodo.addEventListener('click', () => {

            if (window.confirm('Please confirm task deletion') === true) {

                this.currentProject.removeTodo(todo.id);

                storage.save(projectManager.projectCollection);

                this.renderTodos(this.currentProject);

            } else {
                '';
            }

        });

        editTask.addEventListener('click', () => {

            document.getElementById('todo-title').value = todo.title;
            document.getElementById('todo-description').value = todo.description;
            document.getElementById('todo-date').value = todo.dueDate;
            document.getElementById('todo-notes').value = todo.notes;

            document.getElementById('form-container').classList.toggle('hidden-items');

            

        });

        



    





    })



   },

   projectAdd: function() {
    
    let addProjectBtn = document.getElementById('add-project-button');


    addProjectBtn.addEventListener('click', () => { 

        let newProjectPrompt = prompt('Add project name:');

        let newProject = projectManager.add(newProjectPrompt);

        let newProjectMade = this.createElement('button', 'project-btn', newProject.name);

        newProjectMade.addEventListener('click', () => {
            this.currentProject = newProject;
            this.renderTodos(newProject);
        });

        this.sidebarRef.appendChild(newProjectMade);
        storage.save(projectManager.projectCollection);

    




    });

    


   },

   formReference: document.getElementById('form-container'),

   todoAdd: function() {

    const todoBtnRef = document.getElementById('add-todo-button');

    todoBtnRef.addEventListener('click', () => {


        document.getElementById('form-container').classList.toggle('hidden-items');
        console.log('todo ref was clicked');

        
    })
    


    
   },


   gatherFormData: function() {

    const submitBtnRef = document.getElementById('todo-submit');
    const inboxProjectRef = projectManager.projectCollection[0];

        submitBtnRef.addEventListener('click', (e) => {

            if(this.currentTodoId === null) {
                    
                

                e.preventDefault();

                const formData = {

                    todoTitle: document.getElementById('todo-title').value,

                    todoDesc: document.getElementById('todo-description').value,

                    todoDate: document.getElementById('todo-date').value,

                    todoNotes: document.getElementById('todo-notes').value,

                    todoCompletion: document.getElementById('todo-completion').value,

                    todoFieldset: document.querySelector('input[name="prioAnswer"]:checked').value,
                }

                console.log(formData);
                console.log(formData.todoFieldset);

                let formTodo = new todo(
                    formData.todoTitle, formData.todoDesc, 
                    formData.todoDate, 
                    formData.todoFieldset, 
                    formData.todoNotes);

                if (this.currentProject === null) {

                    this.currentProject = inboxProjectRef;

                }
                this.currentProject.addTodo(formTodo);

                storage.save(projectManager.projectCollection);

                this.renderTodos(this.currentProject);

                document.querySelector('.todo-form').reset();

                document.getElementById('form-container').classList.toggle('hidden-items');
            } else {
                
                const currentTask = this.currentProject.todoHolder.find(todo => todo.id === this.currentTodoId);

                currentTask.title = document.getElementById('todo-title').value;
                currentTask.description= document.getElementById('todo-description').value;
                currentTask.dueDate = document.getElementById('todo-date').value;
                currentTask.priority = document.querySelector('input[name="prioAnswer"]:checked').value;
                currentTask.notes= document.getElementById('todo-notes').value;

                storage.save(projectManager.projectCollection);
                this.renderTodos(this.currentProject);
                this.currentTodoId = null;
                document.getElementById('form-container').classList.add('hidden-items');



            }
            
           


            






        })
    },

    currentProject: null, // will track which project has been clicked
    currentTodoId: null


    





}