import { ProjectManager } from '../classes/ProjectManager.js'
import { Project } from '../classes/Project.js'
import { renderProjects } from './renderProjects.js';
import { todoHandler } from './todoHandler.js';

export const projectHandler = (() => {
    
    const manager = new ProjectManager();
    let selected = null;
    
    function init() {
        // Default project
        add('Project 1');
        render();

        const display = document.querySelector('.project-display');
        const addBtn = document.querySelector('.add-project');
        const modal = document.querySelector('#project-modal');
        const input = modal.querySelector('#project-name');
        const submit = modal.querySelector('.submit');
        const cancel = modal.querySelector('.cancel');

        addBtn.addEventListener('click', ()=>{
            modal.showModal();
        });

        submit.addEventListener('click', ()=> {
            add(input.value);
            clearModal();
            modal.close();
            render();
        });

        cancel.addEventListener('click', ()=>{
            clearModal();
            modal.close();
        });

        display.addEventListener('click',(event) => {
            const target = event.target;
            if (target.classList.contains('delete-project')) {
                const index = target.getAttribute('id');
                remove(index);
                render();
            } else if (target.classList.contains('project-card')) {
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

    function add(name) {
        const project = new Project(name);
        manager.addProject(project);
    }

    function remove(index) {
        manager.removeProject(index);
    }

    function render() {
        renderProjects.render(manager);
    }

    return { init }
})();