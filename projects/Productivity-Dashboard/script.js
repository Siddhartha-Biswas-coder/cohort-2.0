/* ==========================================
   1. GLOBAL SELECTORS
   ========================================== */
const allElems = document.querySelectorAll(".all-Elements .elements");
const fullElemsPage = document.querySelectorAll(".fullElem");
const fullElemsPageBackBtn = document.querySelectorAll(".fullElem .back");

/* ==========================================
   2. CORE UI NAVIGATION (Feature Switching)
   ========================================== */
function initializeNavigation() {
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (fullElemsPage[elem.id]) {
        fullElemsPage[elem.id].style.display = "block";
      }
    });
  });

  fullElemsPageBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      if (fullElemsPage[back.id]) {
        fullElemsPage[back.id].style.display = "none";
      }
    });
  });
}

/* ==========================================
   3. TODO LIST SECTION (Self-Contained)
   ========================================== */
function initTodoList() {
  // --- Local Selectors (only exist inside this function) ---
  const todoForm = document.querySelector(".addTask form");
  const taskInput = document.querySelector("#task-input");
  const taskDetailsInput = document.querySelector(".addTask form textarea");
  const allTaskList = document.querySelector(".allTask");
  const allTaskCheckBox = document.querySelector("#check");

  // --- Local State ---
  let currentTask = JSON.parse(localStorage.getItem("currentTask")) || [];

  // --- Internal Functions ---
  function renderTodoTasks() {
    let htmlTemplate = "";
    currentTask.forEach((elem, idx) => {
      const impClass = elem.imp ? "show-imp" : "hide-imp";
      htmlTemplate += `
        <div class="task">
          <h5>${elem.task} <span class="${impClass}">imp</span></h5>
          <button id="${idx}">Mark as Completed</button>
        </div>`;
    });
    allTaskList.innerHTML = htmlTemplate;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }

  function handleTodoSubmit(e) {
    e.preventDefault();
    if (!taskInput.value.trim()) return;

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: allTaskCheckBox.checked,
    });

    taskInput.value = "";
    taskDetailsInput.value = "";
    allTaskCheckBox.checked = false;
    renderTodoTasks();
  }

  function handleTodoDelete(e) {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.id;
      currentTask.splice(index, 1);
      renderTodoTasks();
    }
  }

  // --- Local Event Listeners ---
  if (todoForm) todoForm.addEventListener("submit", handleTodoSubmit);
  if (allTaskList) allTaskList.addEventListener("click", handleTodoDelete);

  // --- Initial Load ---
  renderTodoTasks();
}

/* ==========================================
   4. OTHER SECTIONS (Future Proofing)
   ========================================== */
function initDailyPlanner() {
  // All Daily Planner variables and logic will go here
}

/* ==========================================
   5. APP INITIALIZATION
   ========================================== */
initializeNavigation(); 
initTodoList();         // Runs the Todo section independently
initDailyPlanner();     // Ready for when you build this