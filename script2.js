/* ==========================
   LifeSync - Part 2
   Screen Time Tracker
========================== */

let appUsage =
    JSON.parse(localStorage.getItem("appUsage"))
    || {};


/* ==========================
   SAVE APP DATA
========================== */

function saveAppData() {

    localStorage.setItem(
        "appUsage",
        JSON.stringify(appUsage)
    );

}


/* ==========================
   ADD SCREEN TIME
========================== */

function addScreenTime() {

    const appName =
        document.getElementById("appName")
        .value.trim();

    const screenTime =
        parseInt(
            document.getElementById("screenTime")
            .value
        );

    const appLimit =
        parseInt(
            document.getElementById("appLimit")
            .value
        );

    if(
        appName === "" ||
        isNaN(screenTime)
    ) {

        alert(
            "Enter App Name and Screen Time"
        );

        return;
    }

    if(!appUsage[appName]) {

        appUsage[appName] = {

            usage: 0,

            limit:
                isNaN(appLimit)
                ? 0
                : appLimit

        };

    }

    appUsage[appName].usage += screenTime;

    if(!isNaN(appLimit)) {

        appUsage[appName].limit =
            appLimit;

    }

    saveAppData();

    renderScreenTable();

    renderTopApps();

    checkAlert(appName);

    document.getElementById(
        "appName"
    ).value = "";

    document.getElementById(
        "screenTime"
    ).value = "";

    document.getElementById(
        "appLimit"
    ).value = "";

}


/* ==========================
   SCREEN ALERT
========================== */

function checkAlert(appName) {

    const alertBox =
        document.getElementById(
            "screenAlert"
        );

    const app =
        appUsage[appName];

    if(
        app.limit > 0 &&
        app.usage > app.limit
    ) {

        const exceeded =
            app.usage -
            app.limit;

        alertBox.innerHTML =

            `⚠ ${appName}
            exceeded its limit by
            ${exceeded} minutes`;

    }
    else {

        alertBox.innerHTML = "";

    }

}


/* ==========================
   SCREEN TABLE
========================== */

function renderScreenTable() {

    const table =
        document.getElementById(
            "screenTable"
        );

    table.innerHTML = "";

    Object.entries(appUsage)
    .forEach(([app,data])=>{

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${app}</td>

            <td>
                ${data.usage}
                mins
            </td>

            <td>
                ${
                    data.limit > 0
                    ? data.limit + " mins"
                    : "-"
                }
            </td>

        `;

        table.appendChild(row);

    });

}


/* ==========================
   TOP 5 APPS
========================== */

function renderTopApps() {

    const list =
        document.getElementById(
            "topApps"
        );

    list.innerHTML = "";

    const sortedApps =

        Object.entries(appUsage)

        .sort(
            (a,b)=>
            b[1].usage -
            a[1].usage
        )

        .slice(0,5);

    sortedApps.forEach(item=>{

        const li =
            document.createElement("li");

        li.textContent =

            `${item[0]} -
            ${item[1].usage}
            mins`;

        list.appendChild(li);

    });

}


/* ==========================
   TOTAL SCREEN TIME
========================== */

function getTotalScreenTime() {

    let total = 0;

    Object.values(appUsage)
    .forEach(app=>{

        total += app.usage;

    });

    return total;

}


/* ==========================
   MOST USED APP
========================== */

function getMostUsedApp() {

    const sortedApps =

        Object.entries(appUsage)

        .sort(
            (a,b)=>
            b[1].usage -
            a[1].usage
        );

    if(sortedApps.length === 0) {

        return "None";

    }

    return sortedApps[0][0];

}


/* ==========================
   MONTHLY REPORT UPDATE
========================== */

function updateMonthlyScreenReport() {

    const report =
        document.getElementById(
            "monthlyReport"
        );

    const screenTime =
        getTotalScreenTime();

    const topApp =
        getMostUsedApp();

    report.innerHTML += `

        <p>
            Total Screen Time :
            ${screenTime} mins
        </p>

        <p>
            Most Used App :
            ${topApp}
        </p>

    `;

}


/* ==========================
   INITIAL LOAD
========================== */

renderScreenTable();

renderTopApps();