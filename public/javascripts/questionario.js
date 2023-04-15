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

async function question2() {
    let res = await getCities();
    let i = 1;
    res.forEach(cityDb => {
        let input = document.createElement("input");
        let newline = document.createElement("br");
        input.type = "radio";
        input.name = "answer2";
        input.value = "option" + i;
        document.getElementById("q2").appendChild(input);
        document.getElementById("q2").insertAdjacentHTML("beforeend", cityDb.id);
        document.getElementById("q2").appendChild(newline);
        i++;
    });
}

async function question4() {
    let res = await getActivities();
    let i = 1;
    res.forEach(activityDb => {
        let input = document.createElement("input");
        let newline = document.createElement("br");
        input.type = "radio";
        input.name = "answer4";
        input.value = "option" + i;
        document.getElementById("q4").appendChild(input);
        document.getElementById("q4").insertAdjacentHTML("beforeend", activityDb.id);
        document.getElementById("q4").appendChild(newline);
        i++;
    });
}
// onload = async function () {
//     // <input type="radio" name="answer3" value="option1">1-2<br>
//     await question6();

// }