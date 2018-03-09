var locations = [
  {
    title: "Nugget Market",
    coords: {
      lat: 38.5512412,
      lng: -121.537613
    },
    type: "food"
  },
  {
    title: "Mike's Bikes of Sacramento",
    coords: {
      lat: 38.5801342,
      lng: -121.489208
    },
    type: "retail"
  },
  {
    title: "LowBrau - Pub",
    coords: {
      lat: 38.576069,
      lng: -121.482683
    },
    type: "food"
  },
  {
    title: "Golden 1 Center",
    coords: {
      lat: 38.5810192,
      lng: -121.501754
    },
    type: "entertainment"
  },
  {
    title: "Selland's Market Cafe",
    coords: {
      lat: 38.564455,
      lng: -121.500921
    },
    type: "food"
  },
  {
    title: "Old Sacramento",
    coords: {
      lat: 38.582400,
      lng: -121.505903
    },
    type: "retail"
  },
  {
    title: "Raley Field",
    coords: {
      lat: 38.581514,
      lng: -121.513459
    },
    type: "entertainment"
  },
  {
    title: "Ace of Spades",
    coords: {
      lat: 38.572353,
      lng: -121.4929031
    },
    type: "entertainment"
  }
];


// Data Model
function initMap() {

  var mapConfigOptions = {
    center: { lat: 38.575997, lng: -121.494923 },
    zoom: 13,
    mapTypeControl: true
  };

  var map = new google.maps.Map(document.getElementById('map'), mapConfigOptions);
  var infoWindow = new google.maps.InfoWindow({content: ''});

  var clientID = "BSXQ0ZCOWSV42AUZY1WQAW5RVFPNNZKZV5DZWMB11GG0DON0";
  var clientSecret = "SBIC5HKHK5V3SITRVQ45A3CZBBTBVUZED1QRM5BGFZVLDZGD";


  var Location = function(data) {
    var self = this;
    self.name = data.title;
    self.lat = data.coords.lat;
    self.lng = data.coords.lng;
    self.URL = "";
    self.street = "";
    self.city = "";
    self.phoneNum = "";

    self.visible = ko.observable(true);

    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ //line wrap
      self.lat + ',' + self.lng + '&client_id=' + clientID + '&client_secret=' + //line wrap
      clientSecret + '&v=20160118' + '&query=' + self.name;

    $.getJSON(foursquareURL)
      .done(function(data) {
        var results = data.response.venues[0];
        self.street = results.location.formattedAddress[0];
        self.city = results.location.formattedAddress[1];
        self.phoneNum = results.contact.phone;
        if (typeof self.phoneNum === 'undefined'){
          self.phoneNum = "";
        } else {
          self.phoneNum = self.phoneNum.replace(/[^\d]/g, "");
          self.phoneNum = self.phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        }
      })
      .fail(function() {
        alert("Failure to get infor from FourSquare.  Try back later.");
      });

    self.content = '<div class="info-window-content"><div class="title"><b>' + self.name + "</b></div>" +
      '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
      '<div class="content">' + self.street + "</div>" +
      '<div class="content">' + self.city + "</div>" +
      '<div class="content">' + self.phoneNum + "</div></div>";


    self.marker = new google.maps.Marker({
      position: new google.maps.LatLng(self.lat, self.lng),
      map: map,
      title: self.name
    });

    self.show = function(location) {
        google.maps.event.trigger(self.marker, 'click');
    };

    self.showMarker = ko.computed(function() {
      if(self.visible() === true) {
        self.marker.setMap(map);
      } else {
        self.marker.setMap(null);
      }
      return true;
    }, this);

    self.marker.addListener('click', function(){
      // Close previous clicked window
      infoWindow.close();

      self.content = '<div class="info-window-content"><div class="title"><b>' + self.name + "</b></div>" +
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
        '<div class="content">' + self.street + "</div>" +
        '<div class="content">' + self.city + "</div>" +
        '<div class="content"><a href="tel:' + self.phoneNum +'">' + self.phoneNum +"</a></div></div>";

      infoWindow.setContent(self.content);

      infoWindow.open(map, this);

      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        self.marker.setAnimation(null);
      }, 2100);
    });
  };

  function AppViewModel() {
    var self = this;

    self.locationFilter = ko.observable("");
    self.locationList = ko.observableArray([]);

    locations.forEach(function(locationItem){
      self.locationList.push( new Location(locationItem));
    });

    self.filteredList = ko.computed( function() {
      var filter = self.locationFilter().toLowerCase();
      if (!filter) {
        self.locationList().forEach(function(locationItem){
          locationItem.visible(true);
        });
        return self.locationList();
      } else {
        return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
          var string = locationItem.name.toLowerCase();
          var result = (string.search(filter) >= 0);
          locationItem.visible(result);
          return result;
        });
      }
    }, self);
  }

  function errorHandling() {
    alert("Google Failed to load.");
  }

  ko.applyBindings(new AppViewModel());
}
