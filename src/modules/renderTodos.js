export const renderTodos = (()=>{

    const mainDisplay = document.querySelector('.main-display');
    

    function createTodoCard(todo,index) {
        const card = document.createElement('div');
        const taskName = document.createElement('p');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
        const completed = document.createElement('p');

        card.classList.add('todo-card');
        card.setAttribute('data-index',index);
        taskName.classList.add('name');
        description.classList.add('description');
        dueDate.classList.add('due-date');
        priority.classList.add('priority');
        completed.classList.add('completed');

        taskName.textContent = todo.title;
        description.textContent = todo.description;
        dueDate.textContent = todo.dueDate;
        priority.textContent = todo.priority;
        completed.textContent = todo.completed;

        //add edit and delete buttons
        
        card.append(taskName,description,dueDate,priority,completed)
        return card;
    }

    function buildTodoSection() {
        const todoDisplay = document.createElement('div');
        todoDisplay.classList.add('todo-display');
        clearTodoSection();
        createTitle();
        mainDisplay.append(todoDisplay);
        console.log(mainDisplay)
        createAddTodo();
    }
    
    function displayTodoList(todoList){
        clearTodoList();
        createTodoList(todoList);
    }

    function createTodoList(todoList) {
        const todoDisplay = document.querySelector('.todo-display');
        todoList.forEach((todo,index)=> {
            const card = createTodoCard(todo,index);
            todoDisplay.append(card);
        })
    }

    function createAddTodo() {
        const btn = document.createElement('button');
        btn.setAttribute('type','button');
        btn.classList.add('add-todo');
        btn.textContent = 'Add Todo';
        mainDisplay.append(btn);
    }

    function createTitle() {
        const title = document.createElement('h3');
        title.textContent = 'Todos';
        mainDisplay.append(title);
    }

    function clearTodoSection() {
        mainDisplay.innerHTML = '';
    }
    
    function clearTodoList(){
        const todoDisplay = document.querySelector('.todo-display');
        todoDisplay.innerHTML = '';
    }

    return { buildTodoSection, displayTodoList }
})();