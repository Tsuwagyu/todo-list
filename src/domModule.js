import { projectContainer } from "./projectModule";

const contentContainer = document.getElementById("contentContainer");

export function initLayout() {

    //sidebar stuff

    const sidebarHeader = document.createElement('h2');
    sidebarHeader.textContent = "Projects";

    const sidebarContainer = document.createElement('div');

    sidebarContainer.id = 'sidebar-container';

    const projectList = document.createElement('div');
    projectList.id = 'project-list';

    const addProjectBtn = document.createElement('button');

    addProjectBtn.textContent = 'Add Project';


    sidebarContainer.appendChild(sidebarHeader);
    
    sidebarContainer.appendChild(projectList);

    sidebarContainer.appendChild(addProjectBtn);

    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';

    contentContainer.appendChild(sidebarContainer);










}

export function renderSidebar(projects) {

    const projectListRef = document.getElementById('project-list');

    projectListRef.innerHTML = '';


    projects.forEach((project, index) => {

        const newBtn = document.createElement('button');

        newBtn.textContent = project.name;

        newBtn.dataset.index = index;

        projectListRef.appendChild(newBtn);




        
    })
    



    

    

}
