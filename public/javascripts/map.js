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
      // You can use libraries like axios or fetch to make the HTTP request
  
      // Example using fetch:
      const response = await fetch(`/api/cities/city/${cit_name}`); // Replace with the appropriate API endpoint or database query
  
      if (!response.ok) {
        throw new Error('Failed to fetch city information');
      }
  
      const data = await response.json();
  
      // Extract the relevant information from the response data
      const cit_info = data.cit_info;
      const cit_img = data.cit_img;
  
      // Create an object with the retrieved information
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
  async function showCityInfo() {
    const cityName = localStorage.getItem('cities'); 
    var parsedString = JSON.parse(cityName);

    for(var i=0; i< parsedString.length; i++)
    {
        const finalCityName = parsedString[i]["cit_name"];
        try {
            const cityInfo = await getCityInfo(finalCityName);
            const cityInfoElement = document.getElementById("city-info");
            cityInfoElement.innerHTML += `
              <h2>${finalCityName}</h2>
              <p>${cityInfo.cit_info}</p>
              <img src="${cityInfo.cit_img}" alt="${cityName}">
            `;
          } catch (error) {
            console.error(error);
          }
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
  
          // Load and display the saved route
          const userId = result.user.userId; // Assuming the property name is "userId"
          displaySavedRoute(userId);
        } else if (result.unauthenticated) {
          // User is not authenticated
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
  
          // Use the route parameters to display the route on the map
          // Example: Assuming routeParams contains the necessary information for displaying the route
          // You'll need to adapt this code to your specific use case
          const routeCoordinates = [
            { lat: 37.7749, lng: -122.4194 }, // Example coordinate 1
            { lat: 37.3382, lng: -121.8863 }, // Example coordinate 2
            // Add more coordinates as needed
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
  /*function saveRoute(userId, params) {
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
          window.location.href = 'perfil.html'; // Redireciona para a página de perfil
        } else {
          console.log('Failed to save route.');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  */
  
/*function Save(){
    requestSavedRoute(localStorage.getItem("userId"), localStorage.getItem("params"));}*/
 /*   function Save() {
        const userId = parseInt(localStorage.getItem("userId"));
  const params = localStorage.getItem("params");
  saveRoute(userId, params);
        // Log the params to check the URL-encoded string
      
        try {
          const decodedParams = decodeURIComponent(params); // Decode the URL-encoded string
          console.log("decodedParams:", decodedParams); // Log the decoded string
      
          const jsonStartIndex = decodedParams.indexOf("{"); // Find the index of the first "{" character
          const jsonEndIndex = decodedParams.lastIndexOf("}"); // Find the index of the last "}" character
      
          const jsonSubstring = decodedParams.substring(jsonStartIndex, jsonEndIndex + 1); // Extract the JSON substring
          console.log("jsonSubstring:", jsonSubstring); // Log the extracted JSON substring
      
          const parsedParams = JSON.parse(jsonSubstring); // Parse the JSON substring
          console.log("parsedParams:", parsedParams); // Log the parsed JSON object
      
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
          console.error("Error parsing JSON:", error); // Log any errors during JSON parsing
        }
      }*/
      
      function saveRoute() {
        // Save the route
        
        // Redirect to perfil.html
        window.location.href = "perfil.html";
    }
      
      
      