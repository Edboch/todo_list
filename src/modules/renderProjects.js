import CloseIcon from "../icons/close.svg";
import HashIcon from "../icons/hash.png";

export const renderProjects = (() => {
  // Main container for project display
  const display = document.querySelector(".project-list");

  // Update the project list display
  function render(projects) {
    clear();
    projects.forEach((project, index) => {
      const card = createCard(project, index);
      display.append(card);
    });
  }

  function createCard(project, index) {
    const card = document.createElement("button");
    const name = document.createElement("span");
    const img = document.createElement("img");

    card.setAttribute("data-index", index);
    card.classList.add("project-card");
    name.classList.add("project-name");
    card.type = "button";
    img.classList.add("project-icon");
    img.src = HashIcon;

    // Populate card with project data
    name.textContent = project.name;
    card.append(img,name);

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
