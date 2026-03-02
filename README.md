# Tsu-do: A Modular Todo List Application
A vanilla JavaScript todo list application built with modular architecture, persistent storage, and a focus on understanding core javascript patterns.

## Features
- **Project Management**: Create multiple projects to organize todos (includes a default "Inbox")
- **Todo Management**: 
  - Create todos with title, description, due date, priority level, and notes
  - Edit existing todos
  - Delete todos with confirmation
  - Mark todos as complete
- **Archive System**: Completed tasks automatically move to an archive for future reference
  - View archived tasks separately
  - Permanently delete archived tasks
- **Persistent Storage**: All data saves to localStorage automatically—projects and archives survive page refreshes
- **Collapsible Details**: Todo cards expand to show full details (description, priority, notes, edit/delete buttons)
- **Live Development**: BrowserSync for automatic page reloading during development

## Stack
- **Language**: Vanilla JavaScript (ES6 modules)
- **Build Tool**: Webpack with BrowserSyncPlugin
- **Storage**: localStorage
- **Styling**: CSS3 with CSS variables for theming

### Creating a Project
- Click **"New Project"** in the sidebar
- Enter a project name when prompted
- Projects appear immediately in the sidebar

### Adding a Todo
1. Click a project to view its todos
2. Click **"New task"**
3. Fill in the form:
   - Task name (required)
   - Description
   - Due date
   - Priority (High/Medium/Low)
   - Notes
4. Click submit—the todo appears in the list and saves automatically
### Managing Todos
- **Edit**: Click the "edit" button inside a todo's details
- **Delete**: Click the "delete" button and confirm
- **Complete**: Check the "Complete" checkbox—the todo automatically archives
- **Expand/Collapse**: Click anywhere on a todo card to expand and see full details

### Viewing Archives
- Click the **"Archive"** button in the sidebar to view all completed tasks
- Delete archived tasks with the delete button (they're permanently removed)
- Click a project name again to return to active todos

### Module Organization

**domModule.js**
- Handles all DOM manipulation and rendering
- `renderProjects()` - Displays projects in sidebar
- `renderTodos()` - Displays active project's todos
- `renderArchives()` - Displays completed tasks
- `gatherFormData()` - Captures form input and creates/edits todos
- Manages all event listeners (clicks, form submissions, checkboxes)

**projectModule.js**
- `Project` class: Constructor for project objects with a `todoHolder` array
- `projectManager` object: Manages the collection of all projects (add, remove, update)

**todoModule.js**
- `todo` class: Constructor for individual task objects with properties (title, description, dueDate, priority, notes, id, completed)
- Methods: `todoStatus()` toggles completion, `priorityChanger()`, `changeDate()`

**storageModule.js**
- `saveProjects()` - Serializes and saves projects to localStorage
- `saveArchives()` - Serializes and saves archived tasks separately
- `loadProjects()` - Fetches and rehydrates projects from storage (converts plain JSON back to class instances)
- `loadArchives()` - Fetches and rehydrates archived tasks from storage

**archiveModule.js**
- `archiveManager` object: Manages completed tasks
- `addToArchive()` - Moves completed todo to archive
- `removeFromArchive()` - Permanently deletes from archive

**index.js**
- Entry point: Initializes all modules on page load
- Loads saved data from localStorage
- Creates default Inbox if no projects exist
- Calls setup methods for all interactive features

## Main learning experiences

This project emphasized **understanding over speed**:

1. **Module Pattern & IIFE**: Each module is a self-contained object with public methods and private data
2. **Closures & Lexical Scoping**: Form data capture and event listener scope management
3. **Class-Based Architecture**: Using ES6 classes for data structures with methods
4. **DOM Manipulation**: Creating, appending, and removing elements dynamically
5. **localStorage Serialization**: JSON stringify/parse and rehydrating class instances
6. **State Management**: Tracking `currentProject` and `currentTodoId` across method calls
7. **Event Delegation & Listeners**: Managing multiple similar elements with individual listeners
8. **Separation of Concerns**: Data logic (modules) separate from DOM rendering (domModule)

## Running Tests / Debugging

To check the application state:
1. Open DevTools (F12) // cmd + option + I
2. Go to **Application** then **localStorage**
3. You'll see two keys:
   - `todoListData` - All projects and their todos
   - `archivedTodoData` - All completed tasks
4. Click either to inspect the stored JSON