export function projectContainer(name) {
    
    
    let tasks = [];


    return {
        name,
        tasks,
    
        addTask(task) {
            tasks.push(task);
        }
    };


}