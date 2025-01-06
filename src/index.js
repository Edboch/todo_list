import { projectHandler } from './modules/projectHandler.js';
import { todoHandler } from './modules/todoHandler.js';
import "./style.css";

document.addEventListener('DOMContentLoaded', ()=>{

    projectHandler.init();
    todoHandler.initTodoModal();
})