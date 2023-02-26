window.onload = () => {
  initialUISetup();
  initialStorageSetup();
}

const initialUISetup = () => {
  document.getElementById("search").addEventListener("mouseover", () => addClassWithTimeout("searchLabel", "hovered", 500));
  document.getElementById("search").addEventListener("mouseout", () => removeClassWithTimeout("searchLabel", "hovered", 500));
  document.getElementById("search").addEventListener("keyup", (event) => searchInputHandler(event));
  document.getElementById("addTaskInput").addEventListener("keyup", (event) => vallidateField(event));
  document.getElementById("addButton").addEventListener("click", addNewTask);
  restoreTasks("taskList", stringConstants.localStorageKey);
  restoreTasks("doneTaskList", stringConstants.localStorageDoneKey);
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
  addTaskToStorage({id: id, value: inputElement.value}, stringConstants.localStorageKey);
  inputElement.value = "";
  disableAddTaskButton();
  document.getElementById(id).addEventListener("click", (event) => onRadioClick(event));
}

const restoreTasks = (element, key) => {
  const taskList = getTaskFromStorage(key);
  const taskListTemplates = taskList.map((task) => getTaskTemplate(task.value, task.id).trim());
  const documentFragment =  document.createDocumentFragment();
  const taskWrapper = document.createElement("div");
  for (const task of taskListTemplates) {
    taskWrapper.innerHTML = task;
    documentFragment.append(taskWrapper.firstChild);
  }
  document.getElementById(element).append(documentFragment);
}

const changeTaskStatus = (id) => {
  const taskElement = document.getElementById(id);
  const storageKey = getTaskStorageLocation(id);
  taskElement.remove();
  if (storageKey === stringConstants.localStorageKey) {
    document.getElementById("doneTaskList").append(taskElement); 
  } else {
    document.getElementById("taskList").append(taskElement); 
  }
  removeTaskFromStorage(id, storageKey);
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

const 
searchInputHandler = (event) => {
  if (event.target.value.length > 0) {
    filterTasks(event.target.value);
  } else {
    clearFiltration();
  }
}

const filterTasks = (text) => {
  const taskElementList = document.getElementsByClassName("task");
  for (const taskElement of taskElementList) {
    const taskTitle = taskElement.getElementsByClassName("taskTitle")[0];
    if (!taskTitle || !taskTitle.innerHTML.includes(text)) {
      taskElement.classList.add("hidden");
    }
  }
}

const clearFiltration = () => {
  const taskElementList = document.getElementsByClassName("task");
  for (const taskElement of taskElementList) {
    taskElement.classList.remove("hidden");
  }
}

const stringConstants = {
  localStorageKey: "taskList",
  localStorageDoneKey: "doneTasks",
}

const storageTemplate = JSON.stringify({taskList: []})

const initialStorageSetup = () => {
const initialStorage = getStorage(stringConstants.localStorageKey);
if (!initialStorage) {
  localStorage.setItem(stringConstants.localStorageKey, storageTemplate);
  localStorage.setItem(stringConstants.localStorageDoneKey, storageTemplate);
}
}

const getTaskLocation = (id) => {
  const activeStorage = getStorage(stringConstants.localStorageKey);

  if (JSON.parse(activeStorage).taskList.find((task) => task.id.localCompare(id) === 0)) {
    return stringConstants.localStorageKey;
  } else {
    return stringConstants.localStorageDoneKey;
  }
}

const getTaskFromStorage = (key) => {
  const taskListString = getStorage(key);
  if (!taskListString) {
    initialStorageSetup();
  }
  return JSON.parse(getStorage(key)).taskList;
} 

const addTaskToStorage = (key) => {
  const taskListString = getStorage(key);
  const taskList = JSON.parse(taskListString);
  taskList.taskList.push(task);
  localStorage.setItem(key, JSON.stringify(taskList));
} 

const removeTaskFromStorage= (id, key) => {
  const taskListString = getStorage(key);
  const taskList = JSON.parse(taskListString);
  const newList = taskList.taskList.filter((task) => {
    if (task.id.localCompare(id) === 0) {
      addTaskToStorage(task, key.localCompare(stringConstants.localStorageKey) === 0 ? stringConstants.localStorageDoneKey : stringConstants.localStorageKey)
    } else {
      return task;
    }
  });
  localStorage.setItem(key, JSON.stringify({taskList : newList}));
}

const getStorage = (key) => {
  return localStorage.getItem(key);
}