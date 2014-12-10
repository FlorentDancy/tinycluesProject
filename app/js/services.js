
 angular.module("equipmentsApp").factory("getCurrentLocation", [ '$q',
    function($q) {


        var currentLat = 0;
        var currentLon = 0;

        var getLocation = function(){

            getLocation.deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    showPosition(position);
                    getLocation.deferred.resolve();
                });
            } else {
                $('body').append("Geolocation is not supported by this browser.");
                getLocation.deferred.reject("Ca ne MARCHE PAS !");
            }
            return getLocation.deferred.promise;

        };

        function showPosition(position) {
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;
        }

        var getCurrentLat = function(){
            return currentLat
        };

        var getCurrentLon = function(){
            return currentLon
        };

        var getInitMat = function(){
            var initMap = {
                center: {
                    latitude: currentLat,
                    longitude: currentLon
                },
                zoom: 15
            };
            return initMap
        };

        return {
            getLocation:getLocation,
            getCurrentLat : getCurrentLat,
            getCurrentLon: getCurrentLon,
            getInitMat: getInitMat
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
    }
]);

