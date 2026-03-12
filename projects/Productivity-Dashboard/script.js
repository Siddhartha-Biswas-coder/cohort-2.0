function openFeatures() {
  var allElems = document.querySelectorAll(".all-Elements .elements");
  var fullElemsPage = document.querySelectorAll(".fullElem");
  var fullElemsPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  fullElemsPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      // console.log(back.id)
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

var form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let allTaskList = document.querySelector(".todo-container .allTask ");
let allTaskCheckBox = document.querySelector(
  ".todo-container .addTask form .mark-imp #check",
);

var currentTask = [];

if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
  renderTask(currentTask);
} else {
  console.log("Task list is empty");
}

var allTaskListStorage = localStorage.getItem("currentTask");

function renderTask(currentTask) {
  var sum = "";

  currentTask.forEach(function (elem) {
    sum += `<div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
              <button>Mark as Completed</button>
            </div>`;
  });
  allTaskList.innerHTML = sum;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    imp: allTaskCheckBox.checked,
  });
  localStorage.setItem("currentTask", JSON.stringify(currentTask));

  taskInput.value = "";
  taskDetailsInput.value = "";
  allTaskCheckBox.checked = false;

  renderTask(currentTask);
});

var markCompletedButton = document.querySelectorAll(".task button");
