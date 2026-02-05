import { projectManager } from "./projectModule.js"

export const domManager = {

   createElement: function(tag, className, elementName = ''){ 
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    element.textContent = elementName;
    return element;
   },
   
   renderProjects: function() {
    const sidebarRef = document.getElementById('project-sidebar');

    sidebarRef.innerHTML = '';

    projectManager.projectCollection.forEach(project => {
        const projectBtn = this.createElement('button', 'project-btn', project.name);

        projectBtn.addEventListener('click', () => {
            console.log(`You clicked ${project.name}`);
        });

        sidebarRef.appendChild(projectBtn);
    
    
    
    
    });



   },
}