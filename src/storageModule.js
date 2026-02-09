import { Project } from "./projectModule.js";
import { todo } from "./todoModule.js";

export const storage = {
    save: function(data) {
        const dataString = JSON.stringify(data);

        localStorage.setItem('todoListData', dataString);

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

                jsonProject.todoHolder.forEach(jsonTodo => {
                    const rehydratedTodo = new todo(jsonTodo.title, jsonTodo.description, jsonTodo.dueDate, jsonTodo.priority, jsonTodo.notes, jsonTodo.id, jsonTodo.completed);
                    rehydratedProject.todoHolder.push(rehydratedTodo);
                });

                rehydratedProjectArr.push(rehydratedProject);

                
                
            });

            return rehydratedProjectArr





        }

    }

    
}