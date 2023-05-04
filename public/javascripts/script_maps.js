let map;
let directionsService;
let directionsRenderer;
let polygon=null;


function initMap() {
  // criar um objeto de mapa
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.7435977, lng: -9.2426043 }, 
    zoom: 5
  });
     
  var cities = [
    {
      name: 'Barcelona',
      lat: 41.3851,
      lng: 2.1734
    },
    {
      name: 'Paris',
      lat: 48.8566,
      lng: 2.3522
    },
    {
      name: 'Amsterdam',
      lat: 52.3676,
      lng: 4.9041
    },
    {
      name: 'Santorini',
      lat: 36.3932,
      lng: 25.4615
    },
    {
      name: 'Dubrovnik',
      lat: 42.6507,
      lng: 18.0944
    },
    {
      name: 'Copenhagen',
      lat: 55.6761,
      lng: 12.5683
    },
    {
      name: 'Lisbon',
      lat: 38.7435977,
      lng: -9.2426043
    },
    {
      name: 'Vienna',
      lat: 48.2082,
      lng: 16.3738
    },
    {
      name: 'Budapest',
      lat: 47.4795219,
      lng: 18.5065015
    },
    {
      name: 'Stockholm',
      lat: 59.326038,
      lng: 17.8172485
    },
    {
      name: 'Munich',
      lat: 48.1544891,
      lng: 11.2300171
    },
    {
      name: 'Edinburgh',
      lat: 55.9411809,
      lng: -3.2877387
    },
    {
      name: 'Bruges',
      lat: 51.2606675,
      lng: 3.057302
    },
    {
      name: 'Florence',
      lat: 43.7799286,
      lng: 11.1585671
    },
    {
      name: 'Prague',
      lat: 50.059553,
      lng: 14.3008174
    },
    {
      name: 'Salzburg',
      lat: 47.8027805,
      lng: 12.9740295
    },
    {
      name: 'Tallinn',
      lat: 59.4715893,
      lng: 24.5734375
    },
    {
      name: 'Reykjavik',
      lat: 64.1334671,
      lng: -21.9348418
    },
    {
      name: 'Zurich',
      lat: 47.3774122,
      lng: 8.454335
    },
    {
      name: 'Dublin',
      lat: 53.3242066,
      lng: -6.4105097
    },
    {
      name: 'Berlin',
      lat: 52.5063862,
      lng: 13.095099
    }
  ];
      
          for (var i = 0; i < cities.length; i++) {
            var city = cities[i];
            var marker = new google.maps.Marker({
              position: {lat: city.lat, lng: city.lng},
              map: map,
              title: city.name
            });
          }
 
    fetch('/api/cities/polygon')
    .then(response => response.json())
    .then(data => {
      if (data && data.polygon) {
        // Create a new google.maps.Data object
        polygon = new google.maps.Data({ map: map });

        // Add the GeoJSON data to the polygon object
        polygon.addGeoJson(data.polygon);
      } else {
        console.error("Failed to load polygon data.");
      }
      
      // Parse the polygon data from the response
      const polygonData = JSON.parse(data.result.polygon);

      // Create a polygon object from the polygon data
      polygon = new google.maps.Polygon({
        paths: polygonData.coordinates[0].map(point => ({ lat: point[1], lng: point[0] })),
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,  
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });

      // Add the polygon to the map
      polygon.setMap(map);
    });
}
