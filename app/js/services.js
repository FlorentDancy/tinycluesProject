
 angular.module("equipmentsApp").service("getCurrentLocation", [
    function() {

        var currentLat = 0;
        var currentLon = 0;

        /*
        *
        *

        * */

        this.getCurrentLat = function(){
            getLocation();
            console.log("currentLat dans getCurrentLat dans service avant return : " + currentLat);
            return currentLat;
        };

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

