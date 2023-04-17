const { search } = require("../../../routes/historyRoutes");

async function getCities() {
    const resp = await fetch('/api/seasons/' + season);
    let res = await resp.json();
    return res;
}

async function getActivities() {
    const resp = await fetch('/api/activities/' + city);
    let res = await resp.json();
    return res;
}

async function getHistory() {
    const resp = await fetch('/api/history/' + history);
    let res = await resp.json();
    return res;
}

async function getHistoryBySeason() {
    const resp = await fetch('/api/seasons/history/' + season);
    let res = await resp.json();
    return res;
}

async function getActivityByHistory() {
    const resp = await fetch('/api/history/activities/' + season + "/" +activity);
    let res = await resp.json();
    return res;
}
async function getCostByActivity() {
    const resp = await fetch('/api/activities/cost/' + activity + "/" +cost);
    let res = await resp.json();
    return res;
}

async function question2() {
    let q2 = document.getElementById("q2");
    while (q2.firstChild) {
        q2.removeChild(q2.firstChild);
    }
    let res = await getHistoryBySeason();
    console.log(res);
    let i = 1;
    res.forEach(seasonDb => {
        let input = document.createElement("input");
        let newline = document.createElement("br");
        input.type = "radio";
        input.name = "history";
        input.value = i;
        document.getElementById("q2").appendChild(input);
        document.getElementById("q2").insertAdjacentHTML("beforeend", seasonDb.hist_name);
        document.getElementById("q2").appendChild(newline);
        i++;
    });
}

async function question3() {
    let q3 = document.getElementById("q3");
    while (q3.firstChild) {
        q3.removeChild(q3.firstChild);
    }
    let res = await getActivityByHistory();
    console.log(res);
    let i = 1;
    res.forEach(historyDb => {
        let input = document.createElement("input");
        let newline = document.createElement("br");
        input.type = "radio";
        input.name = "history";
        input.value = i;
        document.getElementById("q3").appendChild(input);
        document.getElementById("q3").insertAdjacentHTML("beforeend", historyDb.act_name);
        document.getElementById("q3").appendChild(newline);
        i++;
    });
}
async function question4() {
    let q3 = document.getElementById("q4");
    while (q3.firstChild) {
        q3.removeChild(q3.firstChild);
    }
    let res = await getCostByActivity();
    console.log(res);
    let i = 1;
    res.forEach(historyDb => {
        let input = document.createElement("input");
        let newline = document.createElement("br");
        input.type = "radio";
        input.name = "history";
        input.value = i;
        document.getElementById("q4").appendChild(input);
        document.getElementById("q4").insertAdjacentHTML("beforeend", historyDb.act_name);
        document.getElementById("q4").appendChild(newline);
        i++;
    });
}

