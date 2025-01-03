import { projectHandler } from "./projectHandler.js";
import { Todo } from "../classes/Todo.js";
import { renderTodos } from "./renderTodos.js";

export const todoHandler = (()=> {
    let project;

    function init(){
        const defaultTodo = new Todo('default','simple things','12-12-2024','high',false);
        project = projectHandler.projectManager.getProject(0);
        project.addTodo(defaultTodo);
        console.log(project);
        renderTodoList();
        

    }

    function renderTodoList() {
        renderTodos.displayTodos(project.todoList);
    }
    return {init}
})();

// project select click => call todoHandler initialise => calls renderTodo(project) + add eventlisteners