angular.module('equipmentsApp.controllers', ['ngResource','appMaps'])
.controller('equipmentsController',function($scope,$resource/*,getCurrentLocation*/) {

        var temp1 = $resource(
            'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/?:path',
            {path:"@path"}
        );

        var temp2 = $resource(
            'https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?:path',
            {path:"@path"}
        );

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

            temp1.get({
                path: "token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1&cid=27,29&offset=0&limit=10&lat="+currentLat+"&lon="+currentLon+"&radius=2000"
            }, function(data) {
                $scope.equipments = data.data;
                angular.forEach($scope.equipments,function(value,key){
                    setTimeout(function(){
                            var eqId = value.id;

                            temp2.get({
                                path: "token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1&id=" + eqId
                            }, function(data) {
                                value.latitude = data.data[0].lat;
                                value.longitude = data.data[0].lon;
                            });
                        }
                        , 200*key)
                });
            });
        }

      /*$scope.equipments = [
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
      ];*/

});

angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('mapCtrl', function($scope, getCurrentLocation, favoritesManager){

        $scope.favoritesMarkers = [];

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
            $scope.map = {
                center: {
                    latitude: currentLat,
                    longitude: currentLon
                },
                zoom: 15
            };
        }

        var markers = [];

        //FIXME Bug quand on manipule les checkboxs, peut laisser le mauvais icon sur la map
        $scope.$watch(function() {
            return favoritesManager.getFavorites();
        }, function() {
            console.log("Y'a du changement");
            markers=[];
            for (var i = 0; i < favoritesManager.getFavorites().length; i++) {
                markers.push(
                    {
                        id: i+1,
                        latitude: favoritesManager.getFavorites()[i].latitude,
                        longitude: favoritesManager.getFavorites()[i].longitude,
                        name: favoritesManager.getFavorites()[i].name
                    }
                )
            }
            $scope.favoritesMarkers = markers;
        }, true);

    });