
async function getCities() {
  const resp = await fetch('/api/seasons/' + season);
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
  const resp = await fetch('/api/activities/cost/' + season+ "/" +activity + "/" +cost);
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

  async function saveRouteData(routeData) {
    try {
      const resp = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(routeData)
      });
  
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      throw new Error(error);
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
                const routeData = cities.map(city => ({
                  cit_name: city.cit_name,
                  geom: city.geom,
                }));
  
                saveRouteData(routeData)
                  .then(() => console.log('Route data saved successfully.'))
                  .catch(error => console.error('Error saving route data:', error));
              } else {
                console.error('Error calculating directions:', status);
              }
            }
          );
        },
        () => {
          alert('Could not get your location');
        }
      );
    } catch (error) {
      console.error(error);
    }
  }


async function question2() {
  let q2 = document.getElementById("q2");
  //Este trecho de código remove todos os nós filhos do elemento q2. Ele limpa qualquer conteúdo anterior que possa estar presente no contêiner.
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
      //insere HTML dentro do elemento identificado por "q2".
      document.getElementById("q2").insertAdjacentHTML("beforeend", seasonDb.hist_name);//insere o conteúdo HTML contido em seasonDb.hist_name como o último filho do elemento com o ID "q2", mantendo o conteúdo existente dentro desse elemento.
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
async function question5() {
  let q5 = document.getElementById("q5");
  while (q5.firstChild) {
      q5.removeChild(q5.firstChild);
  }
  let res = await getNumberOfCities();
  console.log(res);
  let i = 1;
  res.forEach(historyDb => {
      let input = document.createElement("input");
      let newline = document.createElement("br");
      input.type = "checkbox";
      input.name = "history";
      input.value = i;
      document.getElementById("q5").appendChild(input);
      document.getElementById("q5").insertAdjacentHTML("beforeend", historyDb.act_name);
      document.getElementById("q5").appendChild(newline);
      i++;
  });
} 
