import { ProjectManager } from '../classes/ProjectManager.js'
import { Project } from '../classes/Project.js'
import { renderProjects } from './renderProjects.js';
import { todoHandler } from './todoHandler.js';

export const projectHandler = (() => {
    
    // Initialize project manager and track currently selected project card
    const manager = new ProjectManager();
    let selected = null;
    
    // Initialize project handling and set up event listeners
    function init() {
        // Create default project on startup
        add('Project 1');
        render();

        // Get DOM elements for project interactions
        const display = document.querySelector('.project-display');
        const addBtn = document.querySelector('.add-project');
        const modal = document.querySelector('#project-modal');
        const input = modal.querySelector('#project-name');
        const submit = modal.querySelector('.submit');
        const cancel = modal.querySelector('.cancel');

        addBtn.addEventListener('click', ()=>{
            modal.showModal();
        });

        // Handle project creation when submit is clicked
        submit.addEventListener('click', ()=> {
            add(input.value);
            clearModal();
            modal.close();
            render();
        });

        // Clear and close modal when cancel is clicked
        cancel.addEventListener('click', ()=>{
            clearModal();
            modal.close();
        });

        // Handle project card interactions (delete and select)
        display.addEventListener('click',(event) => {
            const target = event.target;
            // Delete project if delete button is clicked
            if (target.classList.contains('delete-project')) {
                const index = target.getAttribute('id');
                remove(index);
                render();
            } 
            // Select project and show its todos if card is clicked
            else if (target.classList.contains('project-card')) {
                if (selected) {
                    selected.classList.remove('selected')
                }
                target.classList.add('selected');
                selected = target
                const index = selected.getAttribute('data-index')
                const project = manager.getProject(index);
                todoHandler.init(project);
            }
        })
    }

    function clearModal() {
        const form = document.querySelector('#project-modal > form');
        form.reset();
    }

    // Create a new project with given name
    function add(name) {
        const project = new Project(name);
        manager.addProject(project);
    }

    function remove(index) {
        manager.removeProject(index);
        // CHECK FOR DELETE TO SEE IF DELETED IS CURRENT PROJECT
        // IF SO THEN SHOULD REMOVE THE UI FOR THE TODO SECTION
    }

    // Update the project display
    function render() {
        renderProjects.render(manager);
    }

    return { init }
})();