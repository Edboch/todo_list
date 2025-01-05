import { projectHandler } from "./projectHandler.js";
import { Todo } from "../classes/Todo.js";
import { renderTodos } from "./renderTodos.js";

export const todoHandler = (()=> {
    let project;

    function init(currentProject){
        project = currentProject;
        renderTodos.init();
        render();
        
        const display = document.querySelector('.todo-display');
        const addBtn = document.querySelector('.add-todo');
        const modal = document.querySelector('#todo-modal');
        const submit = modal.querySelector('.submit');
        const cancel = modal.querySelector('.cancel');

        addBtn.addEventListener('click',()=>{
            modal.showModal();
        })

        submit.addEventListener('click',()=>{
            addTodo();
            clearModal();
            render();
            modal.close();
        })

        cancel.addEventListener('click',()=>{
            modal.close();
            clearModal();
        })
    }

    function addTodo() {
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

    function clearModal() {
        const form = document.querySelector('#todo-modal > form');
        form.reset();
    }

    function render() {
        renderTodos.render(project.todoList);
    }

    return { init }
})();

// project select click => call todoHandler initialise => calls renderTodo(project) + add eventlisteners