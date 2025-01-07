import { Project } from '../classes/Project.js'
import { renderProjects } from './renderProjects.js';
import { renderTodos } from './renderTodos.js'
import { Todo } from '../classes/Todo.js';

// Rename to TaskManager as it manages both projects and todos
export const TaskManager = (() => {
    const projectList = [];
    let activeProjectIndex = null;
    
    function init() {
        // Create default project on startup
        createProject('Project 1');
        updateProjectDisplay();
        setupEventListeners();
    }

    function setupEventListeners() {
        setupProjectListeners();
        setupProjectModalListeners();
        setupTodoModalListeners();
    }

    function setupProjectListeners() {
        const projectDisplay = document.querySelector('.project-display');
        
        projectDisplay.addEventListener('click', (event) => {
            const target = event.target;
            
            if (target.classList.contains('delete-project')) {
                const index = target.getAttribute('id');
                deleteProject(index);
                updateProjectDisplay();
            } 
            else if (target.classList.contains('project-card')) {
                handleProjectSelection(target, projectDisplay);
            }
        });
    }

    function handleProjectSelection(selectedCard, container) {
        if (activeProjectIndex !== null) {
            const previousCard = container.querySelector(`[data-index="${activeProjectIndex}"]`);
            previousCard.classList.remove('selected');
        }
        selectedCard.classList.add('selected');
        activeProjectIndex = selectedCard.getAttribute('data-index');
        initializeProjectView();
    }

    function setupProjectModalListeners() {
        const modal = document.querySelector('#project-modal');
        const addButton = document.querySelector('.add-project');
        const input = modal.querySelector('#project-name');
        const submitButton = modal.querySelector('.submit');
        const cancelButton = modal.querySelector('.cancel');

        addButton.addEventListener('click', () => modal.showModal());

        submitButton.addEventListener('click', () => {
            createProject(input.value);
            clearModalForm(modal);
            modal.close();
            updateProjectDisplay();
        });

        cancelButton.addEventListener('click', () => {
            clearModalForm(modal);
            modal.close();
        });
    }

    function setupTodoModalListeners() {
        const modal = document.querySelector('#todo-modal');
        const submitButton = modal.querySelector('.submit');
        const cancelButton = modal.querySelector('.cancel');

        submitButton.addEventListener('click', () => {
            createTodo();
            clearModalForm(modal);
            updateTodoDisplay();
            modal.close();
        });

        cancelButton.addEventListener('click', () => {
            modal.close();
            clearModalForm(modal);
        });
    }

    function initializeProjectView() {
        if (activeProjectIndex === null) {
            renderTodos.clear();
            return;
        }

        renderTodos.init();
        updateTodoDisplay();
        setupTodoListeners();
    }

    function setupTodoListeners() {
        const todoDisplay = document.querySelector('.todo-display');
        const addTodoButton = document.querySelector('.add-todo');
        const todoModal = document.querySelector('#todo-modal');

        addTodoButton.addEventListener('click', () => todoModal.showModal());

        todoDisplay.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('delete-todo')) {
                const index = target.getAttribute('data-index');
                deleteTodo(index);
                updateTodoDisplay();
            }
        });
    }

    function clearModalForm(modal) {
        const form = modal.querySelector('form');
        form.reset();
    }

    // Project Operations
    function createProject(name) {
        const project = new Project(name);
        projectList.push(project);
    }

    function deleteProject(index) {
        if (activeProjectIndex === index) {
            activeProjectIndex = null;
            initializeProjectView();
        }
        projectList.splice(index, 1);
    }

    // Todo Operations
    function createTodo() {
        const modal = document.querySelector('#todo-modal');
        const todo = new Todo(
            modal.querySelector('#title').value,
            modal.querySelector('#desc').value,
            modal.querySelector('#due-date').value,
            modal.querySelector('#priority').value,
            modal.querySelector('#completed').checked
        );
        projectList[activeProjectIndex].addTodo(todo);
    }
    
    function deleteTodo(index) {
        projectList[activeProjectIndex].removeTodo(index);
    }

    // Display Updates
    function updateProjectDisplay() {
        renderProjects.render(projectList);
    }

    function updateTodoDisplay() {
        renderTodos.render(projectList[activeProjectIndex].todoList);
    }

    return { init };
})();