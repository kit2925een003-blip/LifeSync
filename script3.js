/* ==========================
   LifeSync - Part 3
   Expense Tracker & Reports
========================== */

let expenses =
    JSON.parse(localStorage.getItem("expenses"))
    || {};


/* ==========================
   SAVE EXPENSE DATA
========================== */

function saveExpenseData() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}


/* ==========================
   ADD EXPENSE
========================== */

function addExpense() {

    const category =
        document.getElementById(
            "expenseCategory"
        ).value.trim();

    const amount =
        parseFloat(
            document.getElementById(
                "expenseAmount"
            ).value
        );

    if(
        category === "" ||
        isNaN(amount) ||
        amount <= 0
    ) {

        alert(
            "Enter valid category and amount"
        );

        return;
    }

    if(!expenses[category]) {

        expenses[category] = 0;

    }

    expenses[category] += amount;

    saveExpenseData();

    renderExpenseTable();

    renderExpenseRanking();

    renderMonthlyReport();

    document.getElementById(
        "expenseCategory"
    ).value = "";

    document.getElementById(
        "expenseAmount"
    ).value = "";

}


/* ==========================
   EXPENSE TABLE
========================== */

function renderExpenseTable() {

    const table =
        document.getElementById(
            "expenseTable"
        );

    table.innerHTML = "";

    Object.entries(expenses)
    .forEach(([category,amount])=>{

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${category}</td>

            <td>₹${amount.toFixed(2)}</td>

        `;

        table.appendChild(row);

    });

}


/* ==========================
   EXPENSE RANKING
========================== */

function renderExpenseRanking() {

    const ranking =
        document.getElementById(
            "expenseRanking"
        );

    ranking.innerHTML = "";

    const sorted =

        Object.entries(expenses)

        .sort(
            (a,b)=>
            b[1] - a[1]
        );

    sorted.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent =

            `${item[0]} - ₹${item[1].toFixed(2)}`;

        ranking.appendChild(li);

    });

}


/* ==========================
   TOTAL EXPENSES
========================== */

function getTotalExpenses() {

    let total = 0;

    Object.values(expenses)
    .forEach(amount=>{

        total += amount;

    });

    return total;

}


/* ==========================
   MOST COMPLETED TASK
========================== */

function getMostCompletedTask() {

    const sorted =

        Object.entries(completedStats)

        .sort(
            (a,b)=>
            b[1]-a[1]
        );

    if(sorted.length === 0) {

        return "None";

    }

    return `${sorted[0][0]} (${sorted[0][1]} times)`;

}


/* ==========================
   MOST POSTPONED TASK
========================== */

function getMostPostponedTask() {

    const sorted =

        Object.entries(postponedStats)

        .sort(
            (a,b)=>
            b[1]-a[1]
        );

    if(sorted.length === 0) {

        return "None";

    }

    return `${sorted[0][0]} (${sorted[0][1]} times)`;

}


/* ==========================
   MONTHLY REPORT
========================== */

function renderMonthlyReport() {

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

    let procrastinationRate = 0;

    if(totalTasks > 0) {

        completionRate =
            (
                completedTasks /
                totalTasks
            ) * 100;

        procrastinationRate =
            (
                totalPostponed /
                totalTasks
            ) * 100;

    }

    const totalExpenses =
        getTotalExpenses();

    const totalScreenTime =
        getTotalScreenTime();

    const topApp =
        getMostUsedApp();

    const bestTask =
        getMostCompletedTask();

    const worstTask =
        getMostPostponedTask();

    document.getElementById(
        "monthlyReport"
    ).innerHTML = `

        <p>
            Total Tasks :
            ${totalTasks}
        </p>

        <p>
            Completed Tasks :
            ${completedTasks}
        </p>

        <p>
            Completion Rate :
            ${completionRate.toFixed(1)}%
        </p>

        <p>
            Procrastination Rate :
            ${procrastinationRate.toFixed(1)}%
        </p>

        <p>
            Total Screen Time :
            ${totalScreenTime} mins
        </p>

        <p>
            Most Used App :
            ${topApp}
        </p>

        <p>
            Total Expenses :
            ₹${totalExpenses.toFixed(2)}
        </p>

        <p>
            Most Completed Task :
            ${bestTask}
        </p>

        <p>
            Most Postponed Task :
            ${worstTask}
        </p>

    `;

}


/* ==========================
   UPDATE EVERYTHING
========================== */

function refreshAllReports() {

    updateDashboard();

    renderCompletedStats();

    renderPostponedStats();

    renderTopApps();

    renderExpenseRanking();

    renderMonthlyReport();

}


/* ==========================
   INITIAL LOAD
========================== */

renderTasks();

renderScreenTable();

renderTopApps();

renderExpenseTable();

renderExpenseRanking();

renderMonthlyReport();

refreshAllReports();