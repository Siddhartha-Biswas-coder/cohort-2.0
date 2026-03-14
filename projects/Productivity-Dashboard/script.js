/* ==========================================
   1. GLOBAL CONFIG & SELECTORS
   ========================================== */
const API_KEY = "786b1dc103cc41e3a18120302261403";

const allElems = document.querySelectorAll(".all-Elements .elements");
const fullElemsPage = document.querySelectorAll(".fullElem");
const fullElemsPageBackBtn = document.querySelectorAll(".fullElem .back");

const toDoListCard = document.querySelector(".todo");
const dailyPlannerCard = document.querySelector(".daily");
const motovationalCard = document.querySelector(".motivation");
const pomodoroCard = document.querySelector(".pomodor");
const goalsCard = document.querySelector(".goals");

/* ==========================================
   2. CORE UI NAVIGATION
   ========================================== */
function initializeNavigation() {
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      const page = fullElemsPage[elem.id];
      if (page) {
        // ID 4 (Goals) and ID 2 (Motivation) use flex for centering
        if (elem.id == "4" || elem.id == "2") {
          page.style.display = "flex";
        } else {
          page.style.display = "block";
        }
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
   3. WEATHER & TIME MODULE
   ========================================== */
function initWeatherHeader(city) {
  const header1DayTime = document.querySelector(
    ".all-Elements header .header-1 h1",
  );
  const header1Date = document.querySelector(
    ".all-Elements header .header-1 h3",
  );
  const header1Location = document.querySelector(
    ".all-Elements header .header-1 h4",
  );
  const header2Temperature = document.querySelector(
    ".all-Elements header .header-2 h2",
  );
  const header2Humidity = document.querySelector(
    ".all-Elements header .header-2 .humidity",
  );
  const header2Wind = document.querySelector(
    ".all-Elements header .header-2 .wind",
  );
  const header2Precipitation = document.querySelector(
    ".all-Elements header .header-2 .precipitation",
  );
  const header2FeelsLike = document.querySelector(
    ".all-Elements header .header-2 .feels-like",
  );
  const header2Condition = document.querySelector(
    ".all-Elements header .header-2 .condition",
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function updateWeatherUI(data) {
    if (!data) return;
    header1Location.innerHTML = `${data.location.name} (${data.location.region})`;

    const temp = Math.round(data.current.temp_c);
    header2Temperature.innerHTML = `${temp}°C`;

    const feelsLike = Math.round(data.current.feelslike_c);
    header2FeelsLike.innerHTML = `Feels Like: ${feelsLike}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`
    header2Humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    header2Wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    header2Precipitation.innerHTML = `Precipitation: ${data.current.precip_mm}mm`;
  }

  function updateClock() {
    const date = new Date();

    let rawHours = date.getHours();
    const ampm = rawHours >= 12 ? "pm" : "am";
    rawHours = rawHours % 12 || 12;

    const hours = String(rawHours).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const day = days[date.getDay()];
    const currentDate = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    header1Date.innerHTML = `${currentDate} ${month} ${year}`;
    header1DayTime.innerHTML = `${day}, ${hours}:${minutes}:${seconds}${ampm}`;
  }

  async function fetchWeatherData() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
      );
      const data = await response.json();
      console.log(data);
      updateWeatherUI(data);
    } catch (error) {
      console.log("Weather API Error:", error);
    }
  }

  fetchWeatherData();
  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================
   4. TODO LIST MODULE
   ========================================== */
function initTodoList() {
  const todoForm = document.querySelector(".addTask form");
  const taskInput = document.querySelector("#task-input");
  const taskDetailsInput = document.querySelector(".addTask form textarea");
  const allTaskList = document.querySelector(".allTask");
  const allTaskCheckBox = document.querySelector("#check");

  let currentTask = JSON.parse(localStorage.getItem("currentTask")) || [];

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

  todoForm?.addEventListener("submit", (e) => {
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
  });

  allTaskList?.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      currentTask.splice(e.target.id, 1);
      renderTodoTasks();
    }
  });

  renderTodoTasks();
}

/* ==========================================
   5. DAILY PLANNER MODULE
   ========================================== */
function initDailyPlanner() {
  const dayPlannerContainer = document.querySelector(
    ".daily-planner-fullpage .day-planner",
  );
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  const renderPlanner = () => {
    const hours = Array.from(
      { length: 18 },
      (_, idx) => `${6 + idx}:00 - ${idx === 17 ? "00" : 7 + idx}:00`,
    );
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

    dayPlannerContainer.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", (e) => {
        dayPlanData[e.target.id] = e.target.value;
        localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
      });
    });
  };
  renderPlanner();
}

/* ==========================================
   6. MOTIVATIONAL QUOTES MODULE
   ========================================== */
function initMotivational() {
  const motivationalQuote = document.querySelector(".motivation-wrapper");

  async function fetchQuote() {
    try {
      let rawData = await fetch(`https://dummyjson.com/quotes/random`);
      return await rawData.json();
    } catch (error) {
      return { quote: "Keep pushing forward", author: "system" };
    }
  }

  async function renderQuote() {
    let data = await fetchQuote();
    motivationalQuote.innerHTML = `
      <img src="./icons/quote-right.png" alt="">
      <div class="motivation-1"><h2>Quote of the Day</h2></div>
      <div class="motivation-2"><h1>${data.quote}</h1></div>
      <div class="motivation-3"><h2>~ ${data.author}</h2></div>`;
  }
  renderQuote();
}

/* ==========================================
   7. POMODORO TIMER MODULE
   ========================================== */
function initPomodoro() {
  let totalSeconds = 25 * 60;
  const timer = document.querySelector(".pomo-timer #timer");
  const session = document.querySelector(".pomodoro-fullpage h4");
  const startBtn = document.querySelector(".start-timer");
  const pauseBtn = document.querySelector(".pause-timer");
  const resetBtn = document.querySelector(".reset-timer");
  let timerInterval = null;
  let isWorkSession = true;

  function toggleStartButton(isRunning) {
    startBtn.style.opacity = isRunning ? 0.5 : 1;
    startBtn.style.scale = isRunning ? 0.95 : 1;
    startBtn.style.cursor = isRunning ? "not-allowed" : "pointer";
  }

  function updateTimer() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    timer.innerHTML = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const startTimer = () => {
    if (timerInterval) return;
    toggleStartButton(true);
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        toggleStartButton(false);
        isWorkSession = !isWorkSession;
        totalSeconds = isWorkSession ? 25 * 60 : 5 * 60;
        session.innerHTML = isWorkSession ? "Work Session" : "Break Session";
        updateTimer();
      }
    }, 1000);
  };

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    toggleStartButton(false);
  });
  resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isWorkSession = true;
    totalSeconds = 25 * 60;
    updateTimer();
    toggleStartButton(false);
  });

  updateTimer();
}

/* ==========================================
   8. DAILY GOALS MODULE
   ========================================== */
function initDailyGoals() {
  const goalInput = document.querySelector(".daily-goals-fullpage input");
  const goalList = document.querySelector(".goals-list");
  const addBtn = document.querySelector(".add-goal-btn");

  let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  const renderGoals = () => {
    goalList.innerHTML =
      goals
        .map(
          (g, i) => `
      <div class="goal-item ${g.completed ? "completed" : ""}" data-index="${i}">
        <p>${g.text}</p>
        <i class="ri-delete-bin-line delete-goal"></i>
      </div>`,
        )
        .join("") || "<p>No goals set for today!</p>";
    localStorage.setItem("dailyGoals", JSON.stringify(goals));
  };

  addBtn?.addEventListener("click", () => {
    const text = goalInput.value.trim();
    if (!text) return;
    goals.push({ text, completed: false });
    goalInput.value = "";
    renderGoals();
  });

  goalInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = goalInput.value.trim();
      if (!text) return;
      goals.push({ text, completed: false });
      goalInput.value = "";
      renderGoals();
    }
  });

  goalList?.addEventListener("click", (e) => {
    const index = e.target.closest(".goal-item")?.dataset.index;
    if (index === undefined) return;
    if (e.target.classList.contains("delete-goal")) {
      goals.splice(index, 1);
    } else {
      goals[index].completed = !goals[index].completed;
    }
    renderGoals();
  });

  renderGoals();
}

/* ==========================================
   9. APP INITIALIZATION (The "Engine")
   ========================================== */
initializeNavigation();
initWeatherHeader("Durgapur");
initTodoList();
initDailyPlanner();
initPomodoro();
initDailyGoals();

// Motivation is special: it refreshes on card click
motovationalCard.addEventListener("click", initMotivational);
