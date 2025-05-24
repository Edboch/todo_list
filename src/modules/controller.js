import { Project } from "../classes/Project.js";
import { renderProjects } from "./renderProjects.js";
import { renderTasks } from "./renderTasks.js";
import { Task } from "../classes/Task.js";
import { saveToStorage, loadProjects } from "./storage.js";

export const controller = (() => {
  let projectList = loadProjects();
  let activeProjectIndex = null;

  function init() {
    updateProjectDisplay();
    setupEventListeners();
  }

  function setupEventListeners() {
    setupSidebarToggle();
    setupProjectListeners();
    setupProjectModalListeners();
    setupTaskModalListeners();
  }

  function setupSidebarToggle() {
    const toggle = document.querySelector(".toggle-sidebar");
    const sidebar = document.querySelector("nav");
    const container = document.querySelector(".container");

    toggle.addEventListener("click", () => {
      const closed = sidebar.classList.toggle("closed");
      const sidebarClosed = container.classList.toggle("sidebar-closed");
    })
  }

  function setupProjectListeners() {
    const projectDisplay = document.querySelector(".project-list");

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
    const closeButton = modal.querySelector(".close-modal");

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

    closeButton.addEventListener("click", () => {
      clearModalForm(modal);
      modal.close();
    });
  }

  function setupTaskModalListeners() {
    const modal = document.querySelector("#task-modal");
    const form = modal.querySelector("#task-form");
    const cancelButton = modal.querySelector(".cancel");


    form.addEventListener("submit", () => {
      const editing = modal.getAttribute("data-edit-index");
      if (editing) {
        updateTask();
        modal.removeAttribute("data-edit-index");
      } else {
        createTask();
      }
      clearModalForm(modal);
      updateTaskDisplay();
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
      renderTasks.clear();
      return;
    }

    renderTasks.init();
    updateTaskDisplay();
    setupTaskListeners();
  }

  function setupTaskListeners() {
    const taskDisplay = document.querySelector(".task-display");
    const addTaskButton = document.querySelector(".add-task");
    const taskModal = document.querySelector("#task-modal");

    addTaskButton.addEventListener("click", () => {
      taskModal.showModal();
      changeTaskModalTitle();
    });

    taskDisplay.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("delete-task")) {
        const index = target.getAttribute("data-index");
        deleteTask(index);
        updateTaskDisplay();
      } else if (target.classList.contains("edit-task")) {
        const index = target.getAttribute("data-index");
        openEditTaskModal(index);
        changeTaskModalTitle();
      }
    });
  }

  function openEditTaskModal(index) {
    const task = projectList[activeProjectIndex].taskList[index];
    const modal = document.querySelector("#task-modal");
    const title = modal.querySelector("#title");
    const desc = modal.querySelector("#desc");
    const date = modal.querySelector("#due-date");
    const priority = modal.querySelector("#priority");
    const completed = modal.querySelector("#completed");

    title.value = task.title;
    desc.value = task.description;
    date.value = task.dueDate;
    priority.value = task.priority;
    completed.checked = task.completed;
    modal.showModal();
    modal.setAttribute("data-edit-index", index);
  }

  function changeTaskModalTitle() {
    const modal = document.querySelector("#task-modal");
    const editing = modal.getAttribute("data-edit-index");
    const heading = modal.querySelector("h1");
    if (editing) {
      heading.textContent = "Edit Task";
    } else {
      heading.textContent = "New Task";
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

  // Task Operations
  function createTask() {
    const modal = document.querySelector("#task-modal");
    const task = new Task(
      modal.querySelector("#title").value,
      modal.querySelector("#desc").value,
      modal.querySelector("#due-date").value,
      modal.querySelector("#priority").value,
      modal.querySelector("#completed").checked,
    );
    projectList[activeProjectIndex].addTask(task);
    saveToStorage("projectList", projectList);
  }

  function updateTask() {
    const modal = document.querySelector("#task-modal");
    const index = modal.getAttribute("data-edit-index");
    const task = projectList[activeProjectIndex].taskList[index];
    task.title = modal.querySelector("#title").value;
    task.description = modal.querySelector("#desc").value;
    task.dueDate = modal.querySelector("#due-date").value;
    task.priority = modal.querySelector("#priority").value;
    task.completed = modal.querySelector("#completed").checked;
    saveToStorage("projectList", projectList);
  }

  function deleteTask(index) {
    projectList[activeProjectIndex].removeTask(index);
    saveToStorage("projectList", projectList);
  }

  // Display Updates
  function updateProjectDisplay() {
    renderProjects.render(projectList);
  }

  function updateTaskDisplay() {
    renderTasks.render(projectList[activeProjectIndex].taskList);
  }

  return { init };
})();
