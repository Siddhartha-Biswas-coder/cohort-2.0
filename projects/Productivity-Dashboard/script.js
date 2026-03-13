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
   4. DAILY PLANNER SECTION (Self-Contained)
   ========================================== */
function initDailyPlanner() {
  const dayPlannerContainer = document.querySelector(
    ".daily-planner-fullpage .day-planner",
  );

  // State scoped only to this section
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  // Sub-function 1: Generate the hour strings
  const generateHours = () => {
    return Array.from(
      { length: 18 },
      (_, idx) => `${6 + idx}:00 - ${idx === 17 ? "00" : 7 + idx}:00`,
    );
  };

  // Sub-function 2: Render the HTML
  const renderPlanner = () => {
    const hours = generateHours();
    let htmlTemplate = "";

    hours.forEach((timeLabel, idx) => {
      const savedText = dayPlanData[idx] || "";
      htmlTemplate += `
        <div class="day-planner-time">
          <p>${timeLabel}</p>
          <input id="${idx}" type="text" placeholder="..." value="${savedText}">
        </div>`;
    });

    dayPlannerContainer.innerHTML = htmlTemplate;
    setupPlannerListeners(); // Attach listeners after HTML is injected
  };

  // Sub-function 3: Logic/Listeners
  const setupPlannerListeners = () => {
    const inputs = dayPlannerContainer.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        dayPlanData[e.target.id] = e.target.value;
        localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
      });
    });
  };

  // Run the render on load
  renderPlanner();
}

/* ==========================================
   4. MOTIVATIONAL QUOTES SECTION (Self-Contained
   ========================================== */

function initMotivational() {
  async function fetchQuote() {
    let rawData = await fetch(`https://dummyjson.com/quotes/random`);
    let data = await rawData.json();
    console.log(data);
    return data
  }
  fetchQuote();
}

/* ==========================================
   5. APP INITIALIZATION
   ========================================== */
initializeNavigation();
initTodoList(); // Runs the Todo section independently
initDailyPlanner(); // Runs the Daily planner section independently
initMotivational(); //// Runs the Motivational Quotes section independently
