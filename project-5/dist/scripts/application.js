// Data Model
var Model = {
  selectedMarker: ko.observable(null),
  markers: [

  ]
};

var ViewModel = function() {
  console.log("hitting view model");

  var self = this;

};

function initMap() {
  console.log("hitting the init method");

  map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.575997, lng: -121.494923},
          zoom: 13,
          // styles: styles,
          mapTypeControl: false
        });
}
