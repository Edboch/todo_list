export const renderTodos = (()=>{

    const display = document.querySelector('.main-display');
    
    function createCard(todo,index) {
        const card = document.createElement('div');
        const title = document.createElement('p');
        const desc = document.createElement('p');
        const date = document.createElement('p');
        const priority = document.createElement('p');
        const completed = document.createElement('p');

        card.classList.add('todo-card');
        card.setAttribute('data-index',index);
        title.classList.add('name');
        desc.classList.add('description');
        date.classList.add('due-date');
        priority.classList.add('priority');
        completed.classList.add('completed');

        title.textContent = todo.title;
        desc.textContent = todo.description;
        date.textContent = todo.dueDate;
        priority.textContent = todo.priority;
        completed.textContent = todo.completed;
        
        card.append(title,desc,date,priority,completed)
        return card;
    }

    function init() {
        const container = document.createElement('div');
        container.classList.add('todo-display');
        clear();
        addTitle();
        display.append(container);
        addButton();
    }
    
    function render(todoList){
        clearList();
        displayList(todoList);
    }

    function displayList(todoList) {
        const container = document.querySelector('.todo-display');
        todoList.forEach((todo,index)=> {
            const card = createCard(todo,index);
            container.append(card);
        })
    }

    function addButton() {
        const btn = document.createElement('button');
        btn.setAttribute('type','button');
        btn.classList.add('add-todo');
        btn.textContent = 'Add Todo';
        display.append(btn);
    }

    function addTitle() {
        const title = document.createElement('h3');
        title.textContent = 'Todos';
        display.append(title);
    }

    function clear() {
        display.innerHTML = '';
    }
    
    function clearList(){
        const container = document.querySelector('.todo-display');
        container.innerHTML = '';
    }

    return { init, render }
})();