/* ==========================
   LifeSync - Part 1
   Task Management System
========================== */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let completedStats =
    JSON.parse(localStorage.getItem("completedStats")) || {};

let postponedStats =
    JSON.parse(localStorage.getItem("postponedStats")) || {};


/* ==========================
   SAVE DATA
========================== */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "completedStats",
        JSON.stringify(completedStats)
    );

    localStorage.setItem(
        "postponedStats",
        JSON.stringify(postponedStats)
    );
}


/* ==========================
   ADD TASK
========================== */

function addTask() {

    const input =
        document.getElementById("taskInput");

    const taskName =
        input.value.trim();

    if(taskName === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false,
        postponed: 0
    });

    input.value = "";

    saveTasks();

    renderTasks();

    updateDashboard();
}


/* ==========================
   COMPLETE TASK
========================== */

function completeTask(index) {

    if(tasks[index].completed)
        return;

    tasks[index].completed = true;

    const taskName =
        tasks[index].name;

    if(!completedStats[taskName]) {
        completedStats[taskName] = 0;
    }

    completedStats[taskName]++;

    saveTasks();

    renderTasks();

    updateDashboard();
}


/* ==========================
   POSTPONE TASK
========================== */

function postponeTask(index) {

    const taskName =
        tasks[index].name;

    tasks[index].postponed++;

    if(!postponedStats[taskName]) {
        postponedStats[taskName] = 0;
    }

    postponedStats[taskName]++;

    saveTasks();

    renderTasks();

    updateDashboard();
}


/* ==========================
   DELETE TASK
========================== */

function deleteTask(index) {

    if(confirm("Delete this task?")) {

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

        updateDashboard();
    }
}


/* ==========================
   RENDER TASKS
========================== */

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li =
            document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `

            <div>

                <strong class="${
                    task.completed
                    ? 'completed'
                    : ''
                }">

                    ${task.name}

                </strong>

                <br>

                <small>
                    Postponed :
                    ${task.postponed}
                    times
                </small>

            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="completeTask(${index})">

                    Complete

                </button>

                <button
                    class="postpone-btn"
                    onclick="postponeTask(${index})">

                    Postpone

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

    renderCompletedStats();

    renderPostponedStats();
}


/* ==========================
   COMPLETED TASK REPORT
========================== */

function renderCompletedStats() {

    const list =
        document.getElementById(
            "completedTaskStats"
        );

    list.innerHTML = "";

    const sorted =
        Object.entries(completedStats)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,5);

    sorted.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent =
            `${item[0]} - ${item[1]} times`;

        list.appendChild(li);

    });

}


/* ==========================
   POSTPONED TASK REPORT
========================== */

function renderPostponedStats() {

    const list =
        document.getElementById(
            "postponedTaskStats"
        );

    list.innerHTML = "";

    const sorted =
        Object.entries(postponedStats)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,5);

    sorted.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent =
            `${item[0]} - ${item[1]} times`;

        list.appendChild(li);

    });

}


/* ==========================
   DASHBOARD
========================== */

function updateDashboard() {

    const totalTasks =
        tasks.length;

    const completedTasks =
        tasks.filter(
            task => task.completed
        ).length;

    let totalPostponed = 0;

    tasks.forEach(task=>{

        totalPostponed +=
            task.postponed;

    });

    let completionRate = 0;

    if(totalTasks > 0) {

        completionRate =
            (
                completedTasks /
                totalTasks
            ) * 100;

    }

    let procrastinationRate = 0;

    if(totalTasks > 0) {

        procrastinationRate =
            (
                totalPostponed /
                totalTasks
            ) * 100;

    }

    document.getElementById(
        "totalTasks"
    ).textContent =
        totalTasks;

    document.getElementById(
        "completedTasks"
    ).textContent =
        completedTasks;

    document.getElementById(
        "completionRate"
    ).textContent =
        completionRate.toFixed(1)
        + "%";

    document.getElementById(
        "procrastinationRate"
    ).textContent =
        procrastinationRate.toFixed(1)
        + "%";

}


/* ==========================
   INITIAL LOAD
========================== */

renderTasks();

updateDashboard();