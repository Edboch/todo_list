import CloseIcon from "../icons/close.svg";

export const renderProjects = (() => {
  // Main container for project display
  const display = document.querySelector(".project-display");

  // Update the project list display
  function render(projects) {
    clear();
    projects.forEach((project, index) => {
      const card = createCard(project, index);
      display.append(card);
    });
  }

  function createCard(project, index) {
    const card = document.createElement("div");
    const title = document.createElement("h4");

    card.setAttribute("data-index", index);
    card.classList.add("project-card");
    title.classList.add("project-title");

    // Populate card with project data
    title.textContent = project.name;

    card.append(title);
    return card;
  }

  function addDeleteBtn(index) {
    const btn = document.createElement("button");
    btn.classList.add("delete-project");
    btn.setAttribute("data-index", index);
    btn.innerHTML = `<img src="${CloseIcon}"/>`;
    return btn;
  }

  function removeElement(element) {
    element.remove();
  }

  function clear() {
    display.innerHTML = "";
  }

  return { render, addDeleteBtn, removeElement };
})();
