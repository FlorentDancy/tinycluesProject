angular.module('equipmentsApp.controllers', [])
.controller('equipmentsController', function($scope) {

      /*var baseURL = "https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/";
      var EquipmentsDataResource = $resource(baseURL+'?token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1' +
          '&cid=:cid' +
          '&offset=:offset' +
          '&limit=:limit' +
          '&lat=:lat' +
          '&lon=:lon' +
          '&radius=:radius',
          {
            cid:'@cid',
            offset:'@offset',
            limit:'@limit',
            lat:'@lat',
            lon:'@lon',
            radius:'@radius'
          },
          {'get': {method: 'GET' }}
      );

      $scope.Equipment = EquipmentsDataResource;
      $scope.listEquipments = function() {
        // call static query() method of Friend class
        $scope.Equipment.query(function (data) {
          $scope.equipments = data;
        }, function(err) {
          console.log("Equipment.query() error : "+err);
        });
      };

      $scope.listEquipments();*/

      /*var urlParis = 'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/';
      var token= "ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1";
      var cid = "27,29";
      var offset = 0;
      var limit= 10;
      var radius= 1000;
      var lat= 48.853593;
      var lon= 2.378302;

      $.ajax({
       type: "GET",
       url: urlParis,
       data: { token: token, cid: cid, offset: offset, limit: limit, lat: lat, lon: lon, radius:radius }
       })
       .done(function( data ) {
       console.log(data);
       });*/



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
    .controller('mapCtrl', function($scope, getCurrentLocation){

    $scope.favoritesMarkers = [];

    $scope.map = {
    center: {
      latitude: 0 ,
      longitude: 0
    },
    zoom: 15
    };

    var markers = [
        {
            id: 0,
            //TODO Mettre le current lat et current lon
            latitude: 48.853593,
            longitude: 2.378302,
            title: "Current Location"
        }
    ];
    for (var i = 0; i < 1; i++) {
        markers.push(
            //TODO Pousser la valeur des favoris
        )
    }
    $scope.favoritesMarkers = markers;

    //$scope.map = { center: { latitude: getCurrentLocation.currentLat, longitude: getCurrentLocation.currentLon }, zoom: 15 };



    });
angular.module('equipmentsApp', [
    'equipmentsApp.controllers','favoriteFilter','uiGmapgoogle-maps','appMaps'
]);
angular.module('favoriteFilter', [])
    .filter('favorite',function(){
        return function(equipmentsToFilter){
            var i, result =[];

            for(i=0;i<equipmentsToFilter.length;i++){
                if(equipmentsToFilter[i].checked){
                    result.push(equipmentsToFilter[i]);
                }
            }
            return result;
        };
    });

 angular.module("equipmentsApp").service("getCurrentLocation", [
    function() {

        var currentLat = 0;
        var currentLon = 0;

        getLocation();

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                $('body').append("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;
        }


    }

]);


 /*angular.module("equipmentsApp").service("getFavorites", [
    function() {

        var favorites = [];

        this.getFavorites = function(){
            return favorites;
        };

        this.setFavorites = function(fav){
            favorites = fav;
        };
    }

]);*/
/*
 angular.module('equipmentsApp').factory('EquipmentsData', [
         function($resource){
             var baseURL = "https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/";
             var EquipmentsData = $resource(baseURL+'?token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1' +
                 '&cid=:cid' +
                 '&offset=:offset' +
                 '&limit=:limit' +
                 '&lat=:lat' +
                 '&lon=:lon' +
                 '&radius=:radius',
                 {
                     cid:'@cid',
                     offset:'@offset',
                     limit:'@limit',
                     lat:'@lat',
                     lon:'@lon',
                     radius:'@radius'
                 }
             );
             return EquipmentsData;
         }]
 );*/

