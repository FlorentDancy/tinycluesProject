
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

 angular.module('equipmentsApp').service('equipmentsData', [
         function($resource){
             var baseURL = "https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/";
             var equipmentsData = $resource(baseURL+'?token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1' +
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
         }]
 );

