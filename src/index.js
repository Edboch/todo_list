import { taskManager } from './modules/taskManager.js';
import "./style.css";

document.addEventListener('DOMContentLoaded', () => {
    taskManager.init();
});