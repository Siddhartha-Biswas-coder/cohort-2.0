/* ==========================================
   1. GLOBAL SELECTORS
   ========================================== */
const allElems = document.querySelectorAll(".all-Elements .elements");
const fullElemsPage = document.querySelectorAll(".fullElem");
const fullElemsPageBackBtn = document.querySelectorAll(".fullElem .back");
const toDoListCard = document.querySelector(".todo");
const dailyPlannerCard = document.querySelector(".daily");
const motovationalCard = document.querySelector(".motivation");
const pomodoroCard = document.querySelector(".pomodor");
const goalsCard = document.querySelector(".goals");

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
   5. MOTIVATIONAL QUOTES SECTION (Self-Contained
   ========================================== */
function initMotivational() {
  const motivationalQuote = document.querySelector(
    ".motivational-fullpage .motivational-container .motivation-wrapper",
  );
  async function fetchQuote() {
    try {
      let rawData = await fetch(`https://dummyjson.com/quotes/random`);
      let data = await rawData.json();
      return data;
    } catch (error) {
      return { quote: "Keep pushing forward", author: "system" };
    }
  }

  async function renderQuote() {
    let htmlTemplate = "";
    let data = await fetchQuote();
    htmlTemplate = `
            <img src="./icons/quote-right.png" alt="">
            <div class="motivation-1">
              <h2>Quote of the Day</h2>
            </div>
            
            <div class="motivation-2">
              <h1>${data.quote}</h1>
            </div>
            <div class="motivation-3">
              <h2>~ ${data.author}</h2>
            </div>`;
    motivationalQuote.innerHTML = htmlTemplate;
  }
  renderQuote();
}

// function initMotivational() {
//   const motivationalQuote = document.querySelector(
//     ".motivational-fullpage .motivational-container .motivation-wrapper",
//   );

//   // Helper: Fetch fresh data from API
//   async function fetchQuote() {
//     try {
//       let rawData = await fetch(`https://dummyjson.com/quotes/random`);
//       let data = await rawData.json();
//       return data;
//     } catch (error) {
//       return { quote: "Keep pushing forward", author: "system" };
//     }
//   }

//   async function renderQuote() {
//     const today = new Date().toDateString(); // e.g., "Sat Mar 14 2026"
//     const savedQuoteData = JSON.parse(localStorage.getItem("dailyQuote"));

//     let data;

//     // Check if we already have a quote saved for today
//     if (savedQuoteData && savedQuoteData.date === today) {
//       data = savedQuoteData.content;
//     } else {
//       // It's a new day or first time opening, fetch a new one
//       data = await fetchQuote();
//       const quoteToSave = {
//         date: today,
//         content: data
//       };
//       localStorage.setItem("dailyQuote", JSON.stringify(quoteToSave));
//     }

//     // Render the UI
//     const htmlTemplate = `
//             <img src="./icons/quote-right.png" alt="">
//             <div class="motivation-1">
//               <h2>Quote of the Day</h2>
//             </div>
//             <div class="motivation-2">
//               <h1>${data.quote}</h1>
//             </div>
//             <div class="motivation-3">
//               <h2>~ ${data.author}</h2>
//             </div>`;
            
//     motivationalQuote.innerHTML = htmlTemplate;
//   }

//   // Initial call
//   renderQuote();
// }

/* ==========================================
   6. POMODORO TIMER SECTION (Self-Contained
   ========================================== */
function initPomodoro() {}

/* ==========================================
   7. DAILY GOALS SECTION (Self-Contained
   ========================================== */
function initDailyGoals() {}

/* ==========================================
   8. APP INITIALIZATION
   ========================================== */
// 1. Initialize Navigation globally
initializeNavigation();

// 2. Initialize Data/Logic Modules ONCE on page load
// This sets up listeners and loads localstorage without duplicating them
initTodoList();
initDailyPlanner();

// 3. For the Motivation Section: 
// We want to fetch a NEW quote every time the card is clicked.
// We keep the card selector and add the specific trigger.
motovationalCard.addEventListener("click", () => {
  // We can call the internal render function specifically
  // Or just call the whole init if it's designed to fetch fresh
  initMotivational(); 
});

// initPomodoro();
// initDailyGoals();