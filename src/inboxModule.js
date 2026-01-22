import { isToday } from "date-fns";

export function inbox(name) {

    function generateUniqueId() {

        return crypto.randomUUID();
    }

    return {
        name: name,
        id: generateUniqueId(),
        todayTasks:[],
        somedayTasks: [],
        defaultTasks: [],
        addTask(task) {

            if (task.type == "today") {
                this.todayTasks.push(task);
            } else if (task.type == "someday") {
                this.somedayTasks.push(task);
            } else if (task.type === "default") {
                this.defaultTasks.push(task);
            }

        }
    }

    
}




