angular.module('equipmentsApp.controllers', [])
    .controller('equipmentsController', function($scope/*,$resource*/) {

      $scope.favorites = [];

      $scope.equipments = [
        {
          checked : false,
          name: "Maison",
          adress: "51 Rue de Charonne",
          postalCode: 75011,
          latitude: 48.853593,
          longitude: 2.378302
        },
        {
          checked : false,
          name: "Travail",
          adress: "1 Avenue de la Cristallerie",
          postalCode: 92310,
          latitude: 48.827089,
          longitude: 2.223838
        }
      ];

    });


angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('mainCtrl', function($scope) {

      $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 8 };

      getLocation();

      $scope.options = {

      };

      /*var createRandomMarker = function(i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
          idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
          latitude: latitude,
          longitude: longitude,
          title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
      };*/




      $scope.favoritesMarkers = [
        {
          lattitude: $scope.currentLat,
          longitude: $scope.currentLon,
          title: "Current Position"
        }
      ];

      // Get the bounds from the map once it's loaded
      $scope.$watch(function() {
        return $scope.map.bounds;
      }, function(nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
          var markers = [];
          for (var i = 0; i < $scope.favorites.length; i++) {
            var ret = {
              latitude: $scope.favorites[i].latitude,
              longitude: $scope.favorites[i].longitude,
              title: $scope.favorites[i].title
            };
            markers.push(ret)
          }
          $scope.favoritesMarkers = markers;
        }
      }, true);


      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          $('body').append("Geolocation is not supported by this browser.");
        }
      }

      function showPosition(position) {
        $scope.currentLat = position.coords.latitude;
        $scope.currentLon = position.coords.longitude;
        $scope.map = {
          center: {
            latitude: $scope.currentLat, longitude: $scope.currentLon
          },
          zoom: 15,
          bounds: {}
        };
      }
    });
$( document ).ready(function() {

    var urlParis = 'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/';
    var token= "";
    var cid = "27,29";
    var offset = 0;
    var limit= 10;
    var radius= 1000;

    /*$.ajax({
        type: "GET",
        url: urlParis,
        data: { token: token, cid: cid, offset: offset, limit: limit, lat: lat, lon: lon, radius:radius }
    })
    .done(function( data ) {
        console.log(data);
    });*/

});


angular.module('equipmentsApp', [
    'equipmentsApp.controllers','favoriteFilter','uiGmapgoogle-maps','appMaps'
]);
angular.module('favoriteFilter', [])
    .filter('favorite',function($scope){
        return function(equipmentsToFilter){
            var i;

            for(i=0;i<equipmentsToFilter.length;i++){
                if(equipmentsToFilter[i].checked){
                    $scope.favorites.push(equipmentsToFilter[i])
                }
            }
            return $scope.favorites;
        };
    });