import CloseIcon from "../icons/close.svg";
import PencilIcon from "../icons/pencil.svg";
import plusIcon from "../icons/plus.svg";

export const renderTasks = (() => {
  // Main container for task display
  const display = document.querySelector(".main-display");

  // Initialize the task section UI
  function init() {
    const container = document.createElement("div");
    const title = document.createElement("h1");
    container.classList.add("task-display");
    title.classList.add("task-title");
    clear();
    display.append(title);
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

    taskList.forEach((task, index) => {
      const card = createCard(task, index);
      container.append(card);
    });
  }

  // Create a card element for a task item
  function createCard(task, index) {
    const dateFormat = {year: 'numeric', month: 'short', day: 'numeric'};
    const card = document.createElement("div");
    const title = document.createElement("p");
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const priority = document.createElement("p");
    const completionToggle = document.createElement("input");
    const editBtn = document.createElement("button");
    const buttons = document.createElement("div");
    const taskBody = document.createElement("div")
    const textWrapper = document.createElement("div");
    const tagWrapper = document.createElement("div");

    card.classList.add("task-card");
    card.setAttribute("data-index", index);
    title.classList.add("name");
    desc.classList.add("description");
    date.classList.add("due-date");
    priority.classList.add("priority");
    completionToggle.type = "checkbox";
    completionToggle.classList.add("completion-toggle")
    completionToggle.setAttribute("data-index", index);
    editBtn.classList.add("edit-task");
    editBtn.setAttribute("data-index", index);
    buttons.classList.add("task-card-buttons");
    taskBody.classList.add("task-body");
    textWrapper.classList.add("text-wrapper");
    tagWrapper.classList.add("tag-wrapper");

    title.textContent = task.title;
    desc.textContent = task.description;
    date.textContent = task.dueDate? new Date(task.dueDate).toLocaleDateString('en-gb', dateFormat) : '';
    priority.textContent = task.priority;

    textWrapper.append(title);
    if (desc.textContent) textWrapper.append(desc);
    if (date.textContent) tagWrapper.append(date);
    if (priority.textContent) tagWrapper.append(priority);

    editBtn.innerHTML = `<img src="${PencilIcon}"/>`;

    buttons.append(editBtn);

    card.append(completionToggle);
    taskBody.append(textWrapper)
    if (tagWrapper.hasChildNodes()) taskBody.append(tagWrapper);
    card.append(taskBody);
    card.append(buttons);
    return card;
  }

  // Add the "Add Task" button to the display
  function addButton() {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    const span = document.createElement("span");
    btn.setAttribute("type", "button");
    btn.classList.add("add-task");
    span.textContent = "Add Task";
    img.src = plusIcon;
    btn.append(img,span);
    display.append(btn);
  }

  function updateTitle(name) {
    const title = document.querySelector('.task-title');
    title.innerHTML = "";
    title.textContent = name;
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

  return { init, render, clear, updateTitle };
})();
