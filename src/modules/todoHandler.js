import { projectHandler } from "./projectHandler.js";
import { Todo } from "../classes/Todo.js";
import { renderTodos } from "./renderTodos.js";

export const todoHandler = (()=> {
    let project;

    function init(currentProject){
        // temporary generated todos
        // remove it and add actual functionality
        project = currentProject;
        startTodoSection();
        renderTodoList();
        
        const todoDisplay = document.querySelector('.todo-display');
        const addTodoBtn = document.querySelector('.add-todo');
        const todoModal = document.querySelector('#todo-modal');
        const submitTodo = todoModal.querySelector('.submit');
        const cancelModal = todoModal.querySelector('.cancel');

        addTodoBtn.addEventListener('click',()=>{
            todoModal.showModal();
        })

        submitTodo.addEventListener('click',()=>{
            submitModal();
            clearModal();
            renderTodoList();
            todoModal.close();
            
        })

        cancelModal.addEventListener('click',()=>{
            todoModal.close();
            clearModal();
        })
    }

    function submitModal() {
        const todoModal = document.querySelector('#todo-modal');
        const title = todoModal.querySelector('#title')
        const description = todoModal.querySelector('#desc')
        const dueDate = todoModal.querySelector('#due-date')
        const priority = todoModal.querySelector('#priority')
        const completed = todoModal.querySelector('#completed')
        newTodo(title.value,description.value,
                dueDate.value,priority.value,completed.value);

    }

    function newTodo(title,desc,date,priority,completed){
        const todo = new Todo(title,desc,date,priority,completed);
        project.addTodo(todo);
        console.log(project);
    }

    function clearModal() {
        const todoForm = document.querySelector('#todo-modal > form');
        todoForm.reset();
    }

    function startTodoSection() {
        renderTodos.buildTodoSection();
    }
    function renderTodoList() {
        renderTodos.displayTodoList(project.todoList);
    }

    return { init }
})();

// project select click => call todoHandler initialise => calls renderTodo(project) + add eventlisteners