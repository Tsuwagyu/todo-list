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

    
}