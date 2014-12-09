
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

