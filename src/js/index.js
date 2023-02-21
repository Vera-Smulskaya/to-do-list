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

