import { ProjectManager } from '../classes/ProjectManager.js'
import { Project } from '../classes/Project.js'
import { renderProjects } from './renderProjects.js';

export const projectHandler = (() => {
    
    const projectManager = new ProjectManager();
    
    function init() {
        // Default project
        addProject('Project 1');
        renderDisplay();

        const projectDisplay = document.querySelector('.project-display');
        const addProjectBtn = document.querySelector('.add-project');
        const projectModal = document.querySelector('#project-modal');
        const nameInput = projectModal.querySelector('#project-name');
        const submitProject = projectModal.querySelector('.submit');
        const cancelModal = projectModal.querySelector('.cancel');

        addProjectBtn.addEventListener('click', ()=>{
            projectModal.showModal();
        });

        submitProject.addEventListener('click', ()=> {
            addProject(nameInput.value);
            nameInput.value = '';
            projectModal.close();
            renderDisplay();
        });

        cancelModal.addEventListener('click', ()=>{
            projectModal.close();
        });

        projectDisplay.addEventListener('click',(event) => {
            const target = event.target;
            if (target.classList.contains('delete-project')) {
                const deleteIndex = target.getAttribute('id');
                deleteProject(deleteIndex);
                renderDisplay();
            }
        })
    }

    function addProject(name) {
        const project = new Project(name);
        projectManager.addProject(project);
    }

    function deleteProject(index) {
        projectManager.removeProject(index);
    }

    function renderDisplay() {
        renderProjects.displayProjects(projectManager);
    }

    return { init, addProject, projectManager }
})();