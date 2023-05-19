// Define the function to initialize the map
function initMap() {
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 }, // Set the initial map center
      zoom: 2, // Set the initial map zoom level
    });
  
    // Fetch the city data from the server
    fetch('/api/cities/point')
      .then(response => response.json())
      .then(data => {
        // Loop through the cities data and add markers to the map
        data.forEach(city => {
          const position = city.geom.coordinates; // Extract the coordinates from the geom
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(position[1], position[0]),
            map: map,
            title: city.cit_name,
          });
        });
      })
      .catch(error => {
        console.error('Error fetching city data:', error);
      });
  
    // Fetch the polygon data from the server
    fetch('/api/cities/polygon')
  .then(response => {
    console.log('Response:', response); // Log the response for inspection
    if (!response.ok) {
      throw new Error('Error fetching polygon data');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response Data:', data); // Log the response data for inspection
    if (!data || !data.polygon) {
      throw new Error('Invalid response data');
    }
   
    const polygonData = JSON.parse(data.polygon);
    if (!polygonData || !polygonData.coordinates || !Array.isArray(polygonData.coordinates[0])) {
      throw new Error('Invalid response data');
    }
    const coordinates = polygonData.coordinates[0].map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }));
    const polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    polygon.setMap(map);
  })
  }