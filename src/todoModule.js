export function createTask(title, description, dueDate, priority, type) {
  return {
    title, 
    description,
    dueDate,
    priority,
    type,
  };
}