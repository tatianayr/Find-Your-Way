async function getHistoryBySeason() {
  const resp = await fetch('/api/seasons/history/' + season);
  let res = await resp.json();
  return res;
}

async function getActivityByHistory() {
  const resp = await fetch('/api/history/activities/' + season + "/" + activity);
  let res = await resp.json();
  return res;
}
async function getCostByActivity() {
  const resp = await fetch('/api/activities/cost/' + season + "/" + activity + "/" + cost);
  let res = await resp.json();
  return res;
}

async function getNameOfCitiesByForm() {
  try {
    const resp = await fetch('/api/cities/form/' + season + '/' + histories + '/' + activity + '/' + cost);
    const res = await resp.json();
    console.log(res);
    return { status: 200, result: res };
  } catch (error) {
    console.error(error);
    return { status: 500, result: { msg: 'Something went wrong.' } };
  }
}

async function showCities() {
  try {
    const response = await getNameOfCitiesByForm();
    const cities = response.result;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        });
        new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
        });

        const markers = [];
        cities.forEach(city => {
          const position = city.geom.coordinates;
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(position[1], position[0]),
            map: map,
            title: city.cit_name,
          });
          markers.push(marker);
        });
        

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
        const waypoints = markers.map(marker => ({
          location: marker.getPosition(),
          stopover: true,
        }));
        directionsService.route(
          {
            origin: { lat: latitude, lng: longitude },
            destination: { lat: latitude, lng: longitude },
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error("Error calculating directions:", status);
            }
          }
        );
      },
      () => {
        alert("Could not get your location");
      }
    );
  } catch (error) {
    console.error(error);
  }
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
    input.type = "checkbox";
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
    input.type = "checkbox";
    input.name = "history";
    input.value = i;
    document.getElementById("q3").appendChild(input);
    document.getElementById("q3").insertAdjacentHTML("beforeend", historyDb.act_name);
    document.getElementById("q3").appendChild(newline);
    i++;
  });
}
async function question4() {
  let q4 = document.getElementById("q4");
  while (q4.firstChild) {
    q4.removeChild(q4.firstChild);
  }
  let res = await getCostByActivity();
  console.log(res);
  if (!Array.isArray(res)) return; // check if res is an array
  let i = 1;
  res.forEach(activityDb => {
    let input = document.createElement("input");
    let newline = document.createElement("br");
    input.type = "radio";
    input.name = "history";
    input.value = i;
    document.getElementById("q4").appendChild(input);
    document.getElementById("q4").insertAdjacentHTML("beforeend", activityDb.cost_name);
    document.getElementById("q4").appendChild(newline);
    i++;
  });
}

