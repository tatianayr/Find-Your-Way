document.addEventListener("DOMContentLoaded", async function() {
  try {
    let result = await checkAuthenticated(true, false);
    if (result.err) {
      throw result.err;
    }
    const response = await fetch('http://localhost:8080/api/users/auth/' + window.user.id);
    const userData = await response.json();
    const userName = userData.name;

    document.getElementById('user').textContent = 'Username: ' + window.user.name;
    document.getElementById('signin-btn').style.display = 'none';
    document.getElementById('profile-btn').style.display = 'block';

    localStorage.setItem("userId", window.user.id);
    console.log(localStorage.getItem("userId"));
  } catch (err) {
    console.log(err);
    // alert("Something went wrong!")
  }
});

async function logout() {
  try {
    let result = await requestLogout();
    if (!result.successful || result.err)
      throw result.err || { err: "Not successful" };
    window.location.pathname = "index.html";
  } catch (err) {
    console.log(err);
    // alert("Something is not working");
  }
}

const _ReadImage = () => {
  document.querySelector("#status").innerText = `Reading File...`;
  let f = document.querySelector("#file");
  if(f.files && f.files[0]) {
    var reader = new FileReader();
    reader.onload = e => {
      _SaveImage(e.target.result);
    }
    reader.readAsDataURL(f.files[0]);
  }
}
const _SaveImage = img => {
  localStorage.setItem("img", img);
  document.querySelector("#status").innerText = `Saved!`;
}
const _LoadImage = () => {
  if(localStorage.getItem("img")) {
    document.querySelector("#img").src = localStorage.getItem("img");
    document.querySelector("#status").innerText = `Image Loaded!`;
  } else {
    document.querySelector("#status").innerText = `No Image!`;
  }
} 
document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(localStorage.getItem("params"))
  var citiesParam = urlParams.get('cities');

  if (citiesParam) {
      var cities = JSON.parse(decodeURIComponent(citiesParam));
      console.log(cities);
      cities.forEach(city => {
          console.log('City Name:', city.cit_name);
          console.log('City Coordinates:', city.geom.coordinates);
      });
  }
});
function getNameOfCitiesByForm() {
  try {
      const cities = JSON.parse(localStorage.getItem('cities'));
      console.log(cities);
      return cities;
  } catch (error) {
      console.error(error);
      return null;
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

var season = 1;
var histories = 1;
var activity = 1;
var cost = 1;
var number = 1;

function initMap() {
  showCities();
}

function  getCitiesFromURL() {

  const urlParams = new URLSearchParams(localStorage.getItem("params"));
  console.log("MAP -> " + urlParams);
  const citiesParam = urlParams.get('cities');

  if (citiesParam) {
      return JSON.parse(decodeURIComponent(citiesParam));
  } else {
      return null;
  }
}
async function getCityInfo(cit_name) {
  try {
    // Make a request to the database or API to fetch the city information and image

    const response = await fetch(`/api/cities/city/${cit_name}`); 

    if (!response.ok) {
      throw new Error('Failed to fetch city information');
    }

    const data = await response.json();

    const cit_info = data.cit_info;
    const cit_img = data.cit_img;

    const cityInfo = {
      cit_info,
      cit_img
    };

    return cityInfo;
  } catch (error) {
    console.error('Error fetching city information:', error);
    throw new Error('Failed to fetch city information');
  }
}

document.addEventListener("DOMContentLoaded", showCityInfo);

async function showCities() {
  try {
      const cities = getCitiesFromURL();

      if (!cities || cities.length === 0) {
          console.error('No cities found in the URL.');
          return;
      }

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
function loadProfile() {
  // Load the user profile
  fetch('/api/users/auth')
    .then(response => response.json())
    .then(result => {
      if (result.successful) {
        // User is authenticated
        const username = result.user.username;
        document.getElementById('user').textContent = `Username: ${username}`;
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.display = 'block';
        document.getElementById('map').style.display = 'block';

     
        const userId = result.user.userId; 
        displaySavedRoute(userId);
      } else if (result.unauthenticated) {
        
        document.getElementById('signin-btn').style.display = 'block';
        document.getElementById('profile-btn').style.display = 'none';
        document.getElementById('map').style.display = 'none';
      } else {
        console.log('Failed to load user profile.');
      }
    })
    .catch(err => {
      console.error(err);
    });
}


function displaySavedRoute(userId) {
  // Fetch the saved route
  fetch(`/api/users/savedroute/${userId}`)
    .then(response => response.json())
    .then(result => {
      if (result.successful) {
        const routeParams = result.route.params;

       
        const routeCoordinates = [
          { lat: 37.7749, lng: -122.4194 }, 
          { lat: 37.3382, lng: -121.8863 }, 
         
        ];

        const routePath = new google.maps.Polyline({
          path: routeCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        routePath.setMap(map);
      } else {
        console.log('Failed to load saved route.');
      }
    })
    .catch(err => {
      console.error(err);
    });
}
function saveRoute(userId, params) {
  const data = {
    user_id: userId,
    params: params
  };

  fetch('/api/users/savedroute', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Route saved!');
        window.location.href = 'perfil.html';
      } else {
        console.log('Failed to save route.');
      }
    })
    .catch(err => {
      console.error(err);
    });
}

/*function Save(){
  requestSavedRoute(localStorage.getItem("userId"), localStorage.getItem("params"));}*/


  function Save() {
      const userId = parseInt(localStorage.getItem("userId"));
const params = localStorage.getItem("params");
saveRoute(userId, params);
      // Log the params to check the URL-encoded string
    
      try {
        const decodedParams = decodeURIComponent(params); 
        console.log("decodedParams:", decodedParams); 
    
        const jsonStartIndex = decodedParams.indexOf("{"); 
        const jsonEndIndex = decodedParams.lastIndexOf("}"); 
    
        const jsonSubstring = decodedParams.substring(jsonStartIndex, jsonEndIndex + 1); 
        console.log("jsonSubstring:", jsonSubstring); 

        const parsedParams = JSON.parse(jsonSubstring); 
        console.log("parsedParams:", parsedParams); 
        // Make the API request to save the route

        requestSavedRoute(userId, parsedParams)
          .then(response => {
            if (response.successful) {
              // Route saved successfully, retrieve the saved route data
              const savedRouteData = {
                userId: userId,
                params: parsedParams
              };
    
              // Call the function to display the saved route in the user's profile
              displaySavedRouteInProfile(savedRouteData);
            } else {
              console.error('Failed to save the route.');
            }
          })
          .catch(error => {
            console.error('Error saving the route:', error);
          });
      } catch (error) {
        console.error("Error parsing JSON:", error); 
      }
    }
    
    /*function saveRoute() {
      window.location.href = "perfil.html";
  }*/
    
    
    
