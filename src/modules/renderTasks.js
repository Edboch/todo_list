import CloseIcon from "../icons/close.svg";
import PencilIcon from "../icons/pencil.svg";

export const renderTasks = (() => {
  // Main container for task display
  const display = document.querySelector(".main-display");

  // Initialize the task section UI
  function init() {
    const container = document.createElement("div");
    container.classList.add("task-display");
    clear();
    addTitle();
    display.append(container);
    addButton();
  }

  // Update the task list display
  function render(taskList) {
    clearList();
    displayList(taskList);
  }

  // Create and display cards for each task
  function displayList(taskList) {
    const container = document.querySelector(".task-display");

    const header = document.createElement("div");
    const title = document.createElement("h4");
    const desc = document.createElement("h4");
    const date = document.createElement("h4");
    const priority = document.createElement("h4");
    const completed = document.createElement("h4");

    header.classList.add("task-header");
    title.textContent = "Title";
    desc.textContent = "Description";
    date.textContent = "Due Date";
    priority.textContent = "Priority";
    completed.textContent = "Completed";

    header.append(title, desc, date, priority, completed);
    container.append(header);

    taskList.forEach((task, index) => {
      const card = createCard(task, index);
      container.append(card);
    });
  }

  // Create a card element for a task item
  function createCard(task, index) {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const priority = document.createElement("p");
    const completed = document.createElement("p");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const buttons = document.createElement("div");

    card.classList.add("task-card");
    card.setAttribute("data-index", index);
    title.classList.add("name");
    desc.classList.add("description");
    date.classList.add("due-date");
    priority.classList.add("priority");
    completed.classList.add("completed");
    delBtn.classList.add("delete-task");
    delBtn.setAttribute("data-index", index);
    editBtn.classList.add("edit-task");
    editBtn.setAttribute("data-index", index);
    buttons.classList.add("task-card-buttons");

    // Populate card with task data
    title.textContent = task.title || "-";
    desc.textContent = task.description || "-";
    date.textContent = task.dueDate || "-";
    priority.textContent = task.priority || "-";
    completed.textContent = task.completed ? "Completed" : "Not Done";

    delBtn.innerHTML = `<img src="${CloseIcon}"/>`;
    editBtn.innerHTML = `<img src="${PencilIcon}"/>`;

    buttons.append(delBtn, editBtn);

    card.append(title, desc, date, priority, completed, buttons);
    return card;
  }

  // Add the "Add Task" button to the display
  function addButton() {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("add-task");
    btn.textContent = "Add Task";
    display.append(btn);
  }

  // Add the section title
  function addTitle() {
    const title = document.createElement("h2");
    title.textContent = "Tasks";
    display.append(title);
  }

  // Clear the entire task section
  function clear() {
    display.innerHTML = "";
  }

  // Clear only the task list, preserving title and button
  function clearList() {
    const container = document.querySelector(".task-display");
    if (container) {
      container.innerHTML = "";
    }
  }

  return { init, render, clear };
})();
