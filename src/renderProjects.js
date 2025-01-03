export const renderProjects = (() => {
    
    const projectDisplay = document.querySelector('.project-display');

    function displayProjects(projects) {
        clearProjects();
        projects.allProjects.forEach((project,index)=>{
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
    
    return { displayProjects }
})();