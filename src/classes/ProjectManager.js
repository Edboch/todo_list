
export class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(index) {
        this.projects.splice(index,1);
    }

    getProject(index) {
        return this.projects[index];
    }

    get allProjects() {
        return this.projects;
    }
}