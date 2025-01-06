export const renderTodos = (()=>{
    // Main container for todo display
    const display = document.querySelector('.main-display');
    
    // Initialize the todo section UI
    function init() {
        const container = document.createElement('div');
        container.classList.add('todo-display');
        clear();
        addTitle();
        display.append(container);
        addButton();
    }
    
    // Update the todo list display
    function render(todoList){
        clearList();
        displayList(todoList);
    }

    // Create and display cards for each todo
    function displayList(todoList) {
        const container = document.querySelector('.todo-display');

        const header = document.createElement('div');
        const title = document.createElement('h4');
        const desc = document.createElement('h4');
        const date = document.createElement('h4');
        const priority = document.createElement('h4');
        const completed = document.createElement('h4');

        header.classList.add('todo-header');
        title.textContent = 'Title';
        desc.textContent = 'Description';
        date.textContent = 'Due Date';
        priority.textContent = 'Priority';
        completed.textContent = 'Completed';

        header.append(title,desc,date,priority,completed);
        container.append(header);

        todoList.forEach((todo,index)=> {
            const card = createCard(todo,index);
            container.append(card);
        })
    }

    // Create a card element for a todo item
    function createCard(todo,index) {
        const card = document.createElement('div');
        const title = document.createElement('p');
        const desc = document.createElement('p');
        const date = document.createElement('p');
        const priority = document.createElement('p');
        const completed = document.createElement('p');
        const delBtn = document.createElement('button');

        card.classList.add('todo-card');
        card.setAttribute('data-index',index);
        title.classList.add('name');
        desc.classList.add('description');
        date.classList.add('due-date');
        priority.classList.add('priority');
        completed.classList.add('completed');
        delBtn.classList.add('delete-todo');

        // Populate card with todo data
        title.textContent = todo.title;
        desc.textContent = todo.description;
        date.textContent = todo.dueDate;
        priority.textContent = todo.priority;
        completed.textContent = todo.completed;
        delBtn.textContent = 'X';
        
        card.append(title,desc,date,priority,completed,delBtn);
        return card;
    }

    // Add the "Add Todo" button to the display
    function addButton() {
        const btn = document.createElement('button');
        btn.setAttribute('type','button');
        btn.classList.add('add-todo');
        btn.textContent = 'Add Todo';
        display.append(btn);
    }

    // Add the section title
    function addTitle() {
        const title = document.createElement('h4');
        title.textContent = 'Todos';
        display.append(title);
    }

    // Clear the entire todo section
    function clear() {
        display.innerHTML = '';
    }
    
    // Clear only the todo list, preserving title and button
    function clearList(){
        const container = document.querySelector('.todo-display');
        container.innerHTML = '';
    }

    return { init, render, clear }
})();