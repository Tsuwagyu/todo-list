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
        const removeProjectBtn = this.createElement('button', 'remove-project-btn', '✖');

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
        const todoWrapper = this.createElement('div', 'todo-wrapper');
        const todoSummary = this.createElement('summary', 'todo-summary');
        const todoDetails = this.createElement('details', 'todo-details');
        const titleElement = this.createElement('h3', 'todo-title', todo.title);
        const descriptionElement = this.createElement('p', 'todo-description', `description: ${todo.description}`)
        const dueDateElement = this.createElement('p','due-date-picker', todo.dueDate);
        const priorityElement = this.createElement('p', 'todo-priority', `priority: ${todo.priority}`);
        const notesElement = this.createElement('p', 'todo-notes', `note: ${todo.notes}`);
        const deleteTodo = this.createElement('button', 'todo-delete', 'delete');
        const editTask = this.createElement('button', 'todo-edit', 'edit');
        const todoCompletionToggle = this.createElement('input', 'todo-completion', '');
        const todoCompLabel = this.createElement('label', 'todo-completion-label', 'Done?');


        todoCompletionToggle.type = 'checkbox';
        todoCompletionToggle.id = `todo-completion-${todo.id}`;

        todoCompLabel.htmlFor = `todo-completion-${todo.id}`;
        todoCompLabel.textContent = ' Complete';

        todoDetails.appendChild(todoSummary);
        
        todoSummary.appendChild(titleElement);
        todoSummary.appendChild(dueDateElement);
        todoWrapper.appendChild(todoCompletionToggle);
        todoWrapper.appendChild(todoCompLabel);

        todoWrapper.appendChild(todoDetails);

        todoDetails.appendChild(descriptionElement);
        todoDetails.appendChild(priorityElement);
        todoDetails.appendChild(notesElement);
        todoDetails.appendChild(editTask);
        todoDetails.appendChild(deleteTodo);

        todoDisplay.appendChild(todoWrapper);

        deleteTodo.addEventListener('click', () => {

            if (window.confirm('Please confirm task deletion') === true) {

                this.currentProject.removeTodo(todo.id);

                storage.save(projectManager.projectCollection);

                this.renderTodos(this.currentProject);
            }


        });

        todoCompletionToggle.checked = todo.completed;

        todoCompletionToggle.addEventListener('change', () => {
            todo.todoStatus();
            storage.save(projectManager.projectCollection);
        });

        editTask.addEventListener('click', (e) => {

            e.preventDefault();

            this.currentTodoId = todo.id;

            document.getElementById('todo-title').value = todo.title;
            document.getElementById('todo-description').value = todo.description;
            document.getElementById('todo-date').value = todo.dueDate;
            document.getElementById('todo-notes').value = todo.notes;
            document.querySelector(`input[name="prioAnswer"][value="${todo.priority}"]`).checked=true;

            document.getElementById('form-container').classList.toggle('hidden-items');

            

        });

        



    





    })



   },

   projectAdd: function() {
    
    let addProjectBtn = document.getElementById('add-project-button');


    addProjectBtn.addEventListener('click', () => { 

        let newProjectPrompt = prompt('Add project name:');

        projectManager.add(newProjectPrompt);

        storage.save(projectManager.projectCollection);
        this.renderProjects();



    });


   },





   formReference: document.getElementById('form-container'),

   todoAdd: function() {

    const todoBtnRef = document.getElementById('add-todo-button');

    todoBtnRef.addEventListener('click', () => {


        document.getElementById('form-container').classList.toggle('hidden-items');

        
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

                    todoFieldset: document.querySelector('input[name="prioAnswer"]:checked').value,
                }


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
                
                e.preventDefault();

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