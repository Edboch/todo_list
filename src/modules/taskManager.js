import { Project } from "../classes/Project.js";
import { renderProjects } from "./renderProjects.js";
import { renderTodos } from "./renderTodos.js";
import { Todo } from "../classes/Todo.js";
import { saveToStorage, loadProjects } from "./storage.js";

export const taskManager = (() => {
  let projectList = loadProjects();
  let activeProjectIndex = null;

  function init() {
    updateProjectDisplay();
    setupEventListeners();
  }

  function setupEventListeners() {
    setupProjectListeners();
    setupProjectModalListeners();
    setupTodoModalListeners();
  }

  function setupProjectListeners() {
    const projectDisplay = document.querySelector(".project-display");

    projectDisplay.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("delete-project")) {
        const index = target.getAttribute("data-index");
        deleteProject(index);
        updateProjectDisplay();
      } else if (target.classList.contains("project-card")) {
        handleProjectSelection(target, projectDisplay);
      }
    });
  }

  function handleProjectSelection(selectedCard, container) {
    if (activeProjectIndex !== null) {
      const previousCard = container.querySelector(
        `[data-index="${activeProjectIndex}"]`,
      );
      const oldDeleteBtn = container.querySelector(".delete-project");
      previousCard.classList.remove("selected");
      if (oldDeleteBtn) renderProjects.removeElement(oldDeleteBtn);
    }
    selectedCard.classList.add("selected");
    activeProjectIndex = parseInt(selectedCard.getAttribute("data-index"));
    const deleteBtn = renderProjects.addDeleteBtn(activeProjectIndex);
    selectedCard.append(deleteBtn);
    initializeProjectView();
  }

  function setupProjectModalListeners() {
    const modal = document.querySelector("#project-modal");
    const form = document.querySelector("#project-form");
    const addButton = document.querySelector(".add-project");
    const input = modal.querySelector("#project-name");
    const cancelButton = modal.querySelector(".cancel");

    addButton.addEventListener("click", () => modal.showModal());

    form.addEventListener("submit", () => {
      createProject(input.value);
      clearModalForm(modal);
      modal.close();
      updateProjectDisplay();
    });

    cancelButton.addEventListener("click", () => {
      clearModalForm(modal);
      modal.close();
    });
  }

  function setupTodoModalListeners() {
    const modal = document.querySelector("#todo-modal");
    const form = modal.querySelector("#todo-form");
    const cancelButton = modal.querySelector(".cancel");

    form.addEventListener("submit", () => {
      const editing = modal.getAttribute("data-edit-index");
      if (editing) {
        updateTodo();
        modal.removeAttribute("data-edit-index");
      } else {
        createTodo();
      }
      clearModalForm(modal);
      updateTodoDisplay();
      modal.close();
    });

    cancelButton.addEventListener("click", () => {
      modal.removeAttribute("data-edit-index");
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
    const todoDisplay = document.querySelector(".todo-display");
    const addTodoButton = document.querySelector(".add-todo");
    const todoModal = document.querySelector("#todo-modal");

    addTodoButton.addEventListener("click", () => {
      todoModal.showModal();
      changeTodoModalTitle();
    });

    todoDisplay.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("delete-todo")) {
        const index = target.getAttribute("data-index");
        deleteTodo(index);
        updateTodoDisplay();
      } else if (target.classList.contains("edit-todo")) {
        const index = target.getAttribute("data-index");
        openEditTodoModal(index);
        changeTodoModalTitle();
      }
    });
  }

  function openEditTodoModal(index) {
    const todo = projectList[activeProjectIndex].todoList[index];
    const modal = document.querySelector("#todo-modal");
    const title = modal.querySelector("#title");
    const desc = modal.querySelector("#desc");
    const date = modal.querySelector("#due-date");
    const priority = modal.querySelector("#priority");
    const completed = modal.querySelector("#completed");

    title.value = todo.title;
    desc.value = todo.description;
    date.value = todo.dueDate;
    priority.value = todo.priority;
    completed.checked = todo.completed;
    modal.showModal();
    modal.setAttribute("data-edit-index", index);
  }

  function changeTodoModalTitle() {
    const modal = document.querySelector("#todo-modal");
    const editing = modal.getAttribute("data-edit-index");
    const heading = modal.querySelector("h3");
    if (editing) {
      heading.textContent = "Edit Todo";
    } else {
      heading.textContent = "New Todo";
    }
  }

  function clearModalForm(modal) {
    const form = modal.querySelector("form");
    form.reset();
  }

  // Project Operations
  function createProject(name) {
    const project = new Project(name);
    projectList.push(project);
    saveToStorage("projectList", projectList);
  }

  function deleteProject(index) {
    activeProjectIndex = null;
    initializeProjectView();
    projectList.splice(index, 1);
    saveToStorage("projectList", projectList);
  }

  // Todo Operations
  function createTodo() {
    const modal = document.querySelector("#todo-modal");
    const todo = new Todo(
      modal.querySelector("#title").value,
      modal.querySelector("#desc").value,
      modal.querySelector("#due-date").value,
      modal.querySelector("#priority").value,
      modal.querySelector("#completed").checked,
    );
    projectList[activeProjectIndex].addTodo(todo);
    saveToStorage("projectList", projectList);
  }

  function updateTodo() {
    const modal = document.querySelector("#todo-modal");
    const index = modal.getAttribute("data-edit-index");
    const todo = projectList[activeProjectIndex].todoList[index];
    todo.title = modal.querySelector("#title").value;
    todo.description = modal.querySelector("#desc").value;
    todo.dueDate = modal.querySelector("#due-date").value;
    todo.priority = modal.querySelector("#priority").value;
    todo.completed = modal.querySelector("#completed").checked;
    saveToStorage("projectList", projectList);
  }

  function deleteTodo(index) {
    projectList[activeProjectIndex].removeTodo(index);
    saveToStorage("projectList", projectList);
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
