import { Project } from "./projectModule.js";
import { todo } from "./todoModule.js";

export const storage = {
    save: function(data) {
        const dataString = JSON.stringify(data);

        localStorage.setItem('todoListData', dataString);

        console.log('storage module: data saved!');
    },

    load: function() { 
        const todoListStoredData = localStorage.getItem('todoListData'); 

        if (todoListStoredData == null) {
            return [];
        } else {

            const parsedProjectData = JSON.parse(todoListStoredData);

            let rehydratedProjectArr = []; //need to replace every item with new class instance

            parsedProjectData.forEach(jsonProject => {
                const rehydratedProject = new Project(jsonProject.name)  

                rehydratedProjectArr.push(rehydratedProject);
                
            });





        }

    }

    
}