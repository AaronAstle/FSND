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
      }
    },
    {
      title: "Mike's Bikes of Sacramento",
      location: {
        lat: 38.5801342,
        lng: -121.489208
      }
    },
    {
      title: "LowBrau - Pub",
      location: {
        lat: 38.576069,
        lng: -121.482683
      }
    },
    {
      title: "Nugget Market - Best Coffee Ever",
      location: {
        lat: 38.5512412,
        lng: -121.537613
      }
    },
    {
      title: "Nugget Market - Best Coffee Ever",
      location: {
        lat: 38.5512412,
        lng: -121.537613
      }
    },
    {
      title: "Nugget Market - Best Coffee Ever",
      location: {
        lat: 38.5512412,
        lng: -121.537613
      }
    },
    {
      title: "Nugget Market - Best Coffee Ever",
      location: {
        lat: 38.5512412,
        lng: -121.537613
      }
    }
  ];


  locations.forEach( function(d) {

    var marker = new google.maps.Marker( {
      position: d.location,
      map: map,
      title: d.title
    })

    marker.setMap(map);

  });

}
