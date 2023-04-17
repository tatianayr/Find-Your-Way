let map;
let directionsService;
let directionsRenderer;

function initMap() {
  // criar um objeto de mapa
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.8503, lng: 4.3517 }, // coordenadas do centro do mapa
    zoom: 13, // zoom inicial do mapa
  });
   // Cria um objeto de mapa com as opções de limites para a Europa
   var map = new google.maps.Map(document.getElementById("map"), {
    center: brussels,
    zoom: 4,
    restriction: {
      latLngBounds: {
        north: 71.2,
        south: 34.9,
        west: -25.5,
        east: 44.5,
      },
      strictBounds: true,
    },});

  // criar um objeto de serviço de direções
  directionsService = new google.maps.DirectionsService();  

  // criar um objeto de renderização de direções
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
  });
}

function calcularRota() {
  const origem = "San Francisco, CA";
  const destino = "Los Angeles, CA";

  const waypoints = [
    {location: "San Jose, CA"},
    {location: "Santa Barbara, CA"},
    {location: "Ventura, CA"}
  ];

  const request = {
    origin: origem,
    destination: destino,
    waypoints: waypoints,
    optimizeWaypoints: true, // otimizar a ordem dos waypoints para a rota mais rápida
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }else {
      // se ocorrer um erro ao traçar a rota, exibe uma mensagem de erro
      alert("Não foi possível traçar a rota. Erro: " + status);
    }
  });
}
