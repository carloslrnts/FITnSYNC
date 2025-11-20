// schedule.js
// Calendar + schedule logic
// Uses localStorage key: "userSchedules"

// default workouts (programs + descriptions + example video links)
const defaultWorkouts = {
  weightloss: [
    { name: "Running", desc: "Improves endurance and burns calories.", video: "https://youtube.com/shorts/aEHkSa-s8mw?si=pDNKKJQFx2oXNbAb" },
    { name: "Jump Rope", desc: "Full-body cardio that improves coordination.", video: "https://youtu.be/1BZM2Vre5oc?si=ReOyIf-mWJgWk_Ly" },
    { name: "Cycling", desc: "Low-impact cardio for fat burning.", video: "https://youtube.com/shorts/_b5nJSAW8Os?si=ogG4UDnfTEf6DoZ9" }
  ],
  hiit: [
    { name: "High Knees", desc: "Explosive cardio movement targeting legs and core.", video: "https://youtube.com/shorts/74HD05ewlow?si=aYy-WPvMVvYlm_YC" },
    { name: "Mountain Climber", desc: "Core and cardio exercise for full-body conditioning.", video: "https://youtube.com/shorts/ugItycjiB_0?si=YMP2IBSmPLs58iR3" },
    { name: "Burpees", desc: "Full-body high-intensity movement to increase cardio.", video: "https://youtu.be/qLBImHhCXSw?si=mDsaGULRaU_Kco-H" }
  ],
  strength: [
    { name: "Dumbbell Bench Press", desc: "Chest and triceps strengthening exercise.", video: "https://youtube.com/shorts/WbCEvFA0NJs?si=-BgNtYbyLEbRZaE4" },
    { name: "Dumbbell Deadlift", desc: "Builds posterior chain strength: back & legs.", video: "https://youtube.com/shorts/w_SUfk8z76Q?si=mb_mlWeMrEWmzqXx" },
    { name: "Dumbbell Shoulder Press", desc: "Targets shoulders and upper chest.", video: "https://youtube.com/shorts/k6tzKisR3NY?si=NGTwzSYZ4RKXUSJY" }
  ],
  bodyweight: [
    { name: "Squats", desc: "Lower body strength training.", video: "https://youtu.be/8IuITrQ4IGs?si=7KTqylz0N902BAnj" },
    { name: "Push-up", desc: "Chest, triceps and core strength.", video: "https://youtu.be/8IuITrQ4IGs?si=7KTqylz0N902BAnj" },
    { name: "Planks", desc: "Core strength and stability exercise.", video: "thttps://youtu.be/Iu1Tp-z2_KQ?si=cRDwWJUWScZMAgwL" }
  ]
};

const monthLabel = document.getElementById("monthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const detailDate = document.getElementById("detailDate");
const workoutList = document.getElementById("workoutList");
const selectedWorkoutDetail = document.getElementById("selectedWorkoutDetail");
const selName = document.getElementById("selName");
const selDesc = document.getElementById("selDesc");
const selDur = document.getElementById("selDur");
const selVideo = document.getElementById("selVideo");

let current = new Date();
let selectedDateKey = null;

// load userSchedules from localStorage (or empty object)
function loadSchedules() {
  return JSON.parse(localStorage.getItem("userSchedules") || "{}");
}
function saveSchedules(schedules) {
  localStorage.setItem("userSchedules", JSON.stringify(schedules));
}

// get combined workouts (default + user custom) for populating select
function getProgramList(program) {
  return defaultWorkouts[program] || [];
}

// fill workout select when program changes
function populateWorkoutSelect(program) {
  const sel = document.getElementById("workoutSelect");
  sel.innerHTML = "";
  const list = getProgramList(program);
  if (program === "custom") {
    // empty, show custom input
    sel.classList.add("hidden");
    document.getElementById("customName").classList.remove("hidden");
    document.getElementById("descInput").placeholder = "Describe your custom workout...";
  } else {
    sel.classList.remove("hidden");
    document.getElementById("customName").classList.add("hidden");
    list.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.name;
      opt.textContent = w.name;
      sel.appendChild(opt);
    });
    document.getElementById("descInput").placeholder = "Optional description (will override default)";
  }
}

// render calendar for current month
function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();
  monthLabel.textContent = current.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  calendarGrid.innerHTML = "";

  // convert Sunday=0 to index 6 (we start Monday)
  const startIndex = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < startIndex; i++) {
    calendarGrid.innerHTML += `<div></div>`;
  }

  const schedules = loadSchedules();

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const has = schedules[dateKey] && schedules[dateKey].length > 0;

    // highlight today
    const today = new Date();
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

    calendarGrid.innerHTML += `
      <div 
        class="p-3 text-center rounded-lg cursor-pointer border border-white/10 hover:bg-white/10 transition relative ${isToday ? 'ring-2 ring-yellow-400' : ''}"
        onclick="selectDate('${dateKey}')"
        data-date="${dateKey}">
        <div class="text-sm">${d}</div>
        ${has ? `<div class="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-1"></div>` : ""}
      </div>`;
  }
}

// when user clicks a date
function selectDate(dateKey) {
  selectedDateKey = dateKey;
  const d = new Date(dateKey);
  detailDate.textContent = d.toDateString();
  const schedules = loadSchedules();
  const list = schedules[dateKey] || [];
  renderWorkoutList(list);

  // hide selected workout detail
  selectedWorkoutDetail.classList.add("hidden");
}

// render list of workouts in right panel
function renderWorkoutList(list) {
  if (!list || list.length === 0) {
    workoutList.innerHTML = `<p class="text-gray-400">No workouts for this day.</p>`;
    return;
  }
  workoutList.innerHTML = list.map((w, idx) => {
    return `
      <div class="p-3 bg-white/6 rounded flex justify-between items-start">
        <div>
          <div class="font-semibold">${w.name}</div>
          <div class="text-sm text-gray-300">${w.desc || ''}</div>
          ${w.duration ? `<div class="text-xs text-gray-400 mt-1">Duration: ${w.duration} min</div>` : ''}
        </div>
        <div class="flex flex-col items-end gap-2">
          ${w.video ? `<a href="${w.video}" target="_blank" class="text-yellow-400 text-sm hover:underline">Video</a>` : ''}
          <div class="flex gap-2">
            <button class="text-sm px-2 py-1 bg-white/10 rounded" onclick="showWorkoutDetail('${selectedDateKey}', ${idx})">Details</button>
            <button class="text-sm px-2 py-1 bg-red-600 rounded" onclick="deleteWorkout('${selectedDateKey}', ${idx})">Delete</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

// show workout detail in the lower detail box
function showWorkoutDetail(dateKey, idx) {
  const schedules = loadSchedules();
  const item = schedules[dateKey]?.[idx];
  if (!item) return;
  selName.textContent = item.name;
  selDesc.textContent = item.desc || "No description.";
  selDur.textContent = item.duration ? `Duration: ${item.duration} min` : '';
  if (item.video) {
    selVideo.href = item.video;
    selVideo.textContent = "Watch video";
    selVideo.classList.remove("hidden");
  } else {
    selVideo.href = "#";
    selVideo.textContent = "";
    selVideo.classList.add("hidden");
  }
  selectedWorkoutDetail.classList.remove("hidden");
}

// delete workout
function deleteWorkout(dateKey, idx) {
  const schedules = loadSchedules();
  if (!schedules[dateKey]) return;
  schedules[dateKey].splice(idx, 1);
  if (schedules[dateKey].length === 0) delete schedules[dateKey];
  saveSchedules(schedules);
  selectDate(dateKey); // re-render
  renderCalendar();
}

// modal handling
const modal = document.getElementById("modal");
const addBtn = document.getElementById("addWorkoutBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addForm = document.getElementById("addForm");
const programSelect = document.getElementById("programSelect");
const workoutSelect = document.getElementById("workoutSelect");
const customName = document.getElementById("customName");
const modalDate = document.getElementById("modalDate");
const descInput = document.getElementById("descInput");
const durInput = document.getElementById("durInput");
const videoInput = document.getElementById("videoInput");

addBtn.addEventListener("click", () => {
  openModal();
});

cancelBtn.addEventListener("click", closeModal);

function openModal() {
  // if a date is selected, prefill
  if (selectedDateKey) {
    modalDate.value = selectedDateKey;
  } else {
    modalDate.value = new Date().toISOString().substr(0, 10);
  }
  programSelect.value = "weightloss";
  populateWorkoutSelect(programSelect.value);
  descInput.value = "";
  durInput.value = "";
  videoInput.value = "";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

programSelect.addEventListener("change", (e) => {
  populateWorkoutSelect(e.target.value);
});

function populateWorkoutSelect(program) {
  const list = defaultWorkouts[program] || [];
  workoutSelect.innerHTML = "";
  if (program === "custom") {
    workoutSelect.classList.add("hidden");
    customName.classList.remove("hidden");
  } else {
    workoutSelect.classList.remove("hidden");
    customName.classList.add("hidden");
    list.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w.name;
      opt.textContent = w.name;
      workoutSelect.appendChild(opt);
    });
  }
}

addForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const date = modalDate.value;
  const program = programSelect.value;
  let name = "";
  let desc = descInput.value.trim();
  let dur = durInput.value ? Number(durInput.value) : null;
  const video = videoInput.value.trim() || null;

  if (program === "custom") {
    name = customName.value.trim();
    if (!name) {
      alert("Please provide a name for your custom workout.");
      return;
    }
  } else {
    name = workoutSelect.value;
    // if no custom desc provided, use default description
    if (!desc) {
      const found = defaultWorkouts[program].find(x => x.name === name);
      if (found) desc = found.desc || "";
    }
    // if no video provided, use default video
    if (!video) {
      const found = defaultWorkouts[program].find(x => x.name === name);
      if (found) videoInput.value = found.video || "";
    }
  }

  // save into schedules
  const schedules = loadSchedules();
  if (!schedules[date]) schedules[date] = [];
  schedules[date].push({
    name,
    desc,
    duration: dur,
    video: videoInput.value.trim() || (program !== "custom" ? (defaultWorkouts[program].find(x => x.name === name)?.video || null) : null)
  });
  saveSchedules(schedules);

  closeModal();
  // refresh
  if (date === selectedDateKey) {
    selectDate(date);
  } else {
    // select new date to show changes
    selectDate(date);
  }
  renderCalendar();
});

// init
function init() {
  // show logged user name if available
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.username) {
    const pn = document.getElementById("profileName");
    pn.textContent = currentUser.username;
  }

  // default populate selects
  populateWorkoutSelect("weightloss");
  renderCalendar();
}

// expose selectDate and deleteWorkout (for inline onclick)
window.selectDate = selectDate;
window.deleteWorkout = deleteWorkout;
window.showWorkoutDetail = showWorkoutDetail;

init();
