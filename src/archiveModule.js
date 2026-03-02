import { storage } from "./storageModule.js";
import { Project, projectManager } from "./projectModule.js";

export const archiveManager = {

    archivedTasks: [],

    addToArchive(task) {
        this.archivedTasks.push(task);
    },

    removeFromArchive(id) {



        const index = this.archivedTasks.findIndex(task => task.id === id);

        if (index == -1) {

            alert('Nothing to delete');

        } else { this.archivedTasks.splice(index, 1); }

    



    }












}