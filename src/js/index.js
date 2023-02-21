window.onload = () => {
  initialUISetup();
}

const initialUISetup = () => {
  document.getElementById("search").addEventListener("mouseover", () => addClassWithTimeout("searchLabel", "hovered", 500));
  document.getElementById("search").addEventListener("mouseout", () => removeClassWithTimeout("searchLabel", "hovered", 500));
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
  taskWrapper.innerHTML = getTaskTemplate(inputElement.value, id).trim();
}

const getTaskTemplate = (value) => {
  return `<div class="task plainTask">
            <div class="taskName">
            <div class="radio leftElement"><img width="15" src="src/images/search.png"></div>
              <span class="taskTitle">${value}</span>
            </div>  
          </div>`
}