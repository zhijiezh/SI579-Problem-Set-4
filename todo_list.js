function addTask(description, dueTime) {
  const list = document.createElement("li");
  list.innerText = description;

  if (dueTime) {
    const span = document.createElement("span");
    span.classList.add("due");
    const date = new Date(dueTime);
    span.innerText =
      "due " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
    list.append(span);
  }

  const button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-outline-danger done");
  button.setAttribute("type", "button");
  button.innerText = "Done";
  button.addEventListener("click", () => {
    list.remove();
  });
  list.append(button);

  const ul = document.querySelector("ul#task_list");
  ul.append(list);
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
  const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
  const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

  if (dueDate && dueTime) {
    // The user specified both a due date & due time
    //Add the timezone offset to account for the fact that timestamps are specified by UTC
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return dueDate + dueTime + timezoneOffset;
  } else {
    // if the user did not specify both a due date and due time, return false
    return false;
  }
}

function convertAndAddTask() {
  const descriptionInput = document.querySelector(
    "input#task_description_input"
  );
  const dueDateInput = document.querySelector("input#duedate_input");
  const dueTimeInput = document.querySelector("input#duetime_input");
  const dueTime = dateAndTimeToTimestamp(dueDateInput, dueTimeInput);
  addTask(descriptionInput.value, dueTime);
  descriptionInput.value = "";
}

const addButton = document.getElementById("add_task");
addButton.addEventListener("click", () => {
  convertAndAddTask();
});

const inputSection = document.querySelector("input#task_description_input");
inputSection.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 13) {
    convertAndAddTask();
  }
});
