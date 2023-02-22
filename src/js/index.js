window.onload = () => {
  initialUISetup();
}

const initialUISetup = () => {
  document.getElementById("search").addEventListener("mouseover", () => addClassWithTimeout("searchLabel", "hovered", 500));
  document.getElementById("search").addEventListener("mouseout", () => removeClassWithTimeout("searchLabel", "hovered", 500));
  document.getElementById("addTaskInput").addEventListener("keyup", (event) => vallidateField(event));
  document.getElementById("addButton").addEventListener("click", addNewTask);
  radioHandlerSetup();
  }

const addClassWithTimeout = (id, className, timeout) => {
  setTimeout(() => {
    document.getElementById(id).classList.add(className)
  }, timeout);
}

const removeClassWithTimeout = (id, className, timeout) => {
  setTimeout(() => {
    document.getElementById(id).classList.remove(className)
  }, timeout);
}

const addClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.add(className)
}

const removeClassWithoutTimeout = (id, className) => {
  document.getElementById(id).classList.remove(className)
}

const vallidateField = (event) => {
  if (event.target.value.length > 0) {
    enableAddTaskButton();
  } else {
    disableAddTaskButton();
  }
  if (event.key === "Enter" || event.keyCode === 13) {
    addNewTask();
  }
}

const disableAddTaskButton = () => {
  const button = document.getElementById("addButton");
  removeClassWithoutTimeout("addButton", "valid");
}

const enableAddTaskButton = () => {
  const button = document.getElementById("addButton");
  addClassWithoutTimeout("addButton", "valid");
  button.setAttribute("disabled", "");
}

const addNewTask = () => {
  const inputElement = document.getElementById('addTaskInput');
  const taskWrapper = document.createElement('div');
  const id = generateID(10);
  taskWrapper.innerHTML = getTaskTemplate(inputElement.value, id).trim();
  document.getElementById("taskList").append(taskWrapper.firstChild);
  inputElement.value = "";
  disableAddTaskButton();
  document.getElementById(id).addEventListener("click", (event) => onRadioClick(event));
}

const changeTaskStatus = (id) => {
  const taskElement = document.getElementById(id);
  taskElement.remove();
  document.getElementById("doneTaskList").append(taskElement); 
}

const getTaskTemplate = (value, id) => {
  return `<div class="task plainTask" id="${id}">
            <div class="taskName">
            <div class="radio leftElement"><img width="15" src="src/images/search.png"></div>
              <span class="taskTitle">${value}</span>
            </div>  
          </div>`
}

const generateID = (idLength) => {
  let result = "";
  const characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789";
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.random() * characters.length);
  }
  return result;
}

const onRadioClick = (event) => {
  const taskElement = event.target.closest(".task.plainTask");
  if (taskElement) {
    changeTaskStatus(taskElement.getAttribute("id"));
  }
}

const radioHandlerSetup = () => {
  const radioButtons = document.getElementsByClassName("radio");
  for (const radio of radioButtons) {
    radio.removeEventListener("click", (event) => onRadioClick(event));
    radio.addEventListener("click", (event) => onRadioClick(event));
  }
}