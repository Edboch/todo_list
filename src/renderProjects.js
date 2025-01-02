import { ProjectManager } from './classes/ProjectManager.js'
import { Project } from './classes/Project.js'

export const renderProjects = (() => {
    const projectManager = new ProjectManager();
    createListeners();

    function createListeners() {
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
            nameInput.innerHTML = '';
            projectModal.close();
        });

        cancelModal.addEventListener('click', ()=>{
            projectModal.close();
        });
    }

    function addProject(name) {
        const project = new Project(name);
        projectManager.addProject(project);
    }
    
})();