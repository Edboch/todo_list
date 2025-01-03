export const renderTodos = (()=>{
    const todoDisplay = document.querySelector('.todo-display');
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
        
        card.append(taskName,description,dueDate,priority,completed)
        return card;
    }
    
    function displayTodos(todoList){
        clearTodos();
        todoList.forEach((todo,index)=> {
            const card = createTodoCard(todo,index);
            todoDisplay.append(card);
        })
    }
    
    function clearTodos(){
        todoDisplay.innerHTML = '';
    }

    return { displayTodos }
})();