angular.module('equipmentsApp.controllers', ['ngResource','appMaps'])
.controller('equipmentsController',function($scope,$q,$resource,getCurrentLocation) {

        var temp1 = $resource(
            'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/?:path',
            {path:"@path"}
        );

        var temp2 = $resource(
            'https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?:path',
            {path:"@path"}
        );

        getCurrentLocation.getLocation().then(function(){

            var currentLat = getCurrentLocation.getCurrentLat();
            var currentLon = getCurrentLocation.getCurrentLon();

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

        });

});

angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('mapCtrl', function($scope, $q,getCurrentLocation, favoritesManager){

        getCurrentLocation.getLocation().then(function(){
            var currentLat = getCurrentLocation.getCurrentLat();
            var currentLon = getCurrentLocation.getCurrentLon();

            $scope.map = {
                center: {
                    latitude: currentLat,
                    longitude: currentLon
                },
                zoom: 15
            };

        });


        $scope.favoritesMarkers = [];

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
angular.module('equipmentsApp', [
    'equipmentsApp.controllers','favoriteFilter','uiGmapgoogle-maps','appMaps'
]);
angular.module('favoriteFilter', [])
    .filter('favorite',function(favoritesManager){
        return function(equipmentsToFilter){
            var i, result =[];

            for(i=0;i<equipmentsToFilter.length;i++){
                if(equipmentsToFilter[i].checked){
                    result.push(equipmentsToFilter[i]);
                }
            }
            favoritesManager.setFavorites(result);
            return result;
        };
    });

 angular.module("equipmentsApp").factory("getCurrentLocation", [ '$q',
    function($q) {

        var currentLat = 0;
        var currentLon = 0;

        var getLocation = function(){

            getLocation.deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    showPosition(position,getLocation.deferred);

                });
            } else {
                $('body').append("Geolocation is not supported by this browser.");
            }
            return getLocation.deferred.promise;

        };

        var getCurrentLat = function(){
            return currentLat
        };

        var getCurrentLon = function(){
            return currentLon
        };

        function showPosition(position,deferred) {
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;


            deferred.resolve("coucou");
        }
        return {
            getLocation:getLocation,
            getCurrentLat : getCurrentLat,
            getCurrentLon: getCurrentLon
        };
    }
]);

 angular.module("equipmentsApp").service("favoritesManager", [
    function() {

        var favorites = [];

        this.getFavorites = function(){
            return favorites;
        };

        this.setFavorites = function(fav){
            favorites = fav;
        };

        this.pushFavorites = function(obj){
            favorites.push(obj);
        };
    }
]);

