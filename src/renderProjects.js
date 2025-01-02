import { ProjectManager } from './classes/ProjectManager.js'
import { Project } from './classes/Project.js'

export const renderProjects = (() => {
    const projectManager = new ProjectManager();
    const projectDisplay = document.querySelector('.project-display');
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
            nameInput.value = '';
            projectModal.close();
            displayProjects();
        });

        cancelModal.addEventListener('click', ()=>{
            projectModal.close();
        });

        projectDisplay.addEventListener('click',(event) => {
            const target = event.target;
            if (target.classList.contains('delete-project')) {
                const deleteIndex = target.getAttribute('id');
                deleteProject(deleteIndex);
                displayProjects();
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

    function displayProjects() {
        clearProjects();
        projectManager.allProjects.forEach((project,index)=>{
            const card = createProjectCard(project,index);
            projectDisplay.append(card);
        })
    }

    function createProjectCard(project,index) {
        const card = document.createElement('div');
        const projectTitle = document.createElement('h5');
        const deleteProject = document.createElement('button');

        card.setAttribute('data-index',index);
        card.classList.add('project-card');
        projectTitle.classList.add('project-title');
        deleteProject.classList.add('delete-project');
        deleteProject.setAttribute('id',index);

        projectTitle.textContent = project.name;
        deleteProject.textContent = 'Delete';

        card.append(projectTitle,deleteProject);
        return card;
    }

    function clearProjects() {
        projectDisplay.innerHTML = '';
    }
    
})();