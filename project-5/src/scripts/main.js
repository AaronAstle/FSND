// Data Model
function initMap() {

  mapConfigOptions = {
    center: { lat: 38.575997, lng: -121.494923 },
    zoom: 13,
    // styles: styles,
    mapTypeControl: true
  };

  var map = new google.maps.Map(document.getElementById('map'), mapConfigOptions);

  var locationData = [
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


  var Location = function(data) {
    var self = this;
    self.name = data.title;
    self.lat = data.coords.lat;
    self.lng = data.coords.lng;
    self.URL = "";
    self.street = "";
    self.city = "";
    self.phone = "";

    this.visible = ko.observable(true);

    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll='+ this.lat + ',' + this.lng + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=20160118' + '&query=' + this.name;

    $.getJSON(foursquareURL).done(function(data) {
      var results = data.response.venues[0];
      console.log(results);
      self.street = results.location.formattedAddress[0];
      self.city = results.location.formattedAddress[1];
      self.phone = results.contact.phone;
      if (typeof self.phone === 'undefined'){
        self.phone = "";
      } else {
        console.log(self.phone);
        // self.phone = formatPhone(self.phone);
      }
    }).fail(function() {
      alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
    });

    this.contentString = '<div class="info-window-content"><div class="title"><b>' + self.name + "</b></div>" +
      '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
      '<div class="content">' + self.street + "</div>" +
      '<div class="content">' + self.city + "</div>" +
      '<div class="content">' + self.phone + "</div></div>";

    this.infoWindow = new google.maps.InfoWindow({content: self.contentString});

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(self.lat, self.lng),
      map: map,
      title: self.name
    });

    this.showMarker = ko.computed(function() {
      if(this.visible() === true) {
        this.marker.setMap(map);
      } else {
        this.marker.setMap(null);
      }
      return true;
    }, this);

    this.marker.addListener('click', function(){
      self.contentString = '<div class="info-window-content"><div class="title"><b>' + self.name + "</b></div>" +
        '<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
        '<div class="content">' + self.street + "</div>" +
        '<div class="content">' + self.city + "</div>" +
        '<div class="content"><a href="tel:' + self.phone +'">' + self.phone +"</a></div></div>";

      self.infoWindow.setContent(self.contentString);

      self.infoWindow.close();
      self.infoWindow.open(map, this);

      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        self.marker.setAnimation(null);
      }, 2100);
    });

    this.bounce = function(place) {
      google.maps.event.trigger(self.marker, 'click');
    };
  };

  function AppViewModel() {
    var self = this;

    this.locationFilter = ko.observable("");

    this.locationList = ko.observableArray([]);

    // Foursquare API settings
    clientID = "BSXQ0ZCOWSV42AUZY1WQAW5RVFPNNZKZV5DZWMB11GG0DON0";
    clientSecret = "SBIC5HKHK5V3SITRVQ45A3CZBBTBVUZED1QRM5BGFZVLDZGD";

    locationData.forEach(function(locationItem){
      self.locationList.push( new Location(locationItem));
    });

    this.filteredList = ko.computed( function() {
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

    this.mapElem = document.getElementById('map');
    this.mapElem.style.height = window.innerHeight - 50;
  }

  function errorHandling() {
    alert("Google Maps has failed to load. Please check your internet connection and try again.");
  }

  ko.applyBindings(new AppViewModel());
}
