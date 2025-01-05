export const renderProjects = (() => {
    
    const display = document.querySelector('.project-display');

    function render(projects) {
        clear();
        projects.allProjects.forEach((project,index)=>{
            const card = createCard(project,index);
            display.append(card);
        })
    }

    function createCard(project,index) {
        const card = document.createElement('div');
        const title = document.createElement('h5');
        const btn = document.createElement('button');

        card.setAttribute('data-index',index);
        card.classList.add('project-card');
        title.classList.add('project-title');
        btn.classList.add('delete-project');
        btn.setAttribute('id',index);

        title.textContent = project.name;
        btn.textContent = 'Delete';

        card.append(title,btn);
        return card;
    }

    function clear() {
        display.innerHTML = '';
    }
    
    return { render }
})();