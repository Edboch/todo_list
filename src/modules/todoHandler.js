import { projectHandler } from "./projectHandler.js";
import { Todo } from "../classes/Todo.js";
import { renderTodos } from "./renderTodos.js";

export const todoHandler = (()=> {
    // Track the currently active project
    let project = null;

    // Initialize todo handling for a project and set up event listeners
    function init(currentProject){
        if (!currentProject) {
            renderTodos.clear();
            project = null;
            return
        }
        project = currentProject;
        renderTodos.init();
        render();
        
        // Get DOM elements for todo interactions
        const display = document.querySelector('.todo-display');
        const addBtn = document.querySelector('.add-todo');
        const modal = document.querySelector('#todo-modal');

        addBtn.addEventListener('click',()=>{
            modal.showModal();
        })

        display.addEventListener('click', (event)=> {
            const target = event.target;
            if (target.classList.contains('delete-todo')) {
                const index = target.getAttribute('data-index');
                remove(index);
                render();
            }
        })        
    }

    function initTodoModal() {
        const modal = document.querySelector('#todo-modal');
        const submit = modal.querySelector('.submit');
        const cancel = modal.querySelector('.cancel');

        // Handle todo creation when submit is clicked
        submit.addEventListener('click',()=>{
            add();
            clearModal();
            render();
            modal.close();
        })

        // Clear and close modal when cancel is clicked
        cancel.addEventListener('click',()=>{
            modal.close();
            clearModal();
        })
    }

    function add() {
        const modal = document.querySelector('#todo-modal');
        const title = modal.querySelector('#title')
        const desc = modal.querySelector('#desc')
        const date = modal.querySelector('#due-date')
        const priority = modal.querySelector('#priority')
        const completed = modal.querySelector('#completed')
        const todo = new Todo(title.value, desc.value,
                date.value, priority.value, completed.checked);
        project.addTodo(todo);
    }

    function remove(index) {
        project.removeTodo(index);
    }

    function clearModal() {
        const form = document.querySelector('#todo-modal > form');
        form.reset();
    }

    // Update the todo display for current project
    function render() {
        renderTodos.render(project.todoList);
    }

    return { init, initTodoModal }
})();

// project select click => call todoHandler initialise => calls renderTodo(project) + add eventlisteners