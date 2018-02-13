// Data Model
function initMap() {

  var markers = [];

  mapConfigOptions = {
    center: { lat: 38.575997, lng: -121.494923 },
    zoom: 13,
    // styles: styles,
    mapTypeControl: true
  };

  var map = new google.maps.Map(document.getElementById('map'), mapConfigOptions);

  // Create a searchbox in order to execute a places search
  var searchBox = new google.maps.places.SearchBox(
    document.getElementById('places-search'));

  // Bias the searchbox to within the bounds of the map.
  searchBox.setBounds(map.getBounds());

  var locations = [
    {
      title: "Nugget Market - Best Coffee Ever",
      location: {
        lat: 38.5512412,
        lng: -121.537613
      },
      type: "food"
    },
    {
      title: "Mike's Bikes of Sacramento",
      location: {
        lat: 38.5801342,
        lng: -121.489208
      },
      type: "retail"
    },
    {
      title: "LowBrau - Pub",
      location: {
        lat: 38.576069,
        lng: -121.482683
      },
      type: "food"
    },
    {
      title: "Golden 1 Center",
      location: {
        lat: 38.5810192,
        lng: -121.501754
      },
      type: "entertainment"
    },
    {
      title: "Selland's Market Cafe and Bike Dog Brewing",
      location: {
        lat: 38.564455,
        lng: -121.500921
      },
      type: "food"
    },
    {
      title: "Old Sacramento",
      location: {
        lat: 38.582400,
        lng: -121.505903
      },
      type: "retail"
    },
    {
      title: "Raley Field",
      location: {
        lat: 38.581514,
        lng: -121.513459
      },
      type: "entertainment"
    },
    {
      title: "Ace of Spades",
      location: {
        lat: 38.572353,
        lng: -121.4929031
      },
      type: "entertainment"
    }

  ];


  locations.forEach( function(d) {

    var marker = new google.maps.Marker( {
      position: d.location,
      map: map,
      title: d.title
    });

    marker.setMap(map);

  });

}
