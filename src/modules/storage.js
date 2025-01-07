import { Project } from "../classes/Project.js";
import { Todo } from "../classes/Todo.js";

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function loadProjects() {
    const data = JSON.parse(localStorage.getItem('projectList'));
    if (data === null || data.length === 0) {
        return [];
    }
    
    const projectList = data.map(projectData => {
        const project = Object.assign(new Project(), projectData);
        // Reconstruct todo objects properly
        project.todoList.map(todoData => 
            Object.assign(new Todo(), todoData)
        );
        return project;
    });
    
    return projectList;
}