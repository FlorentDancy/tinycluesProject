angular.module('equipmentsApp.controllers', [])
    .controller('equipmentsController', function($scope/*,$resource*/) {
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
$( document ).ready(function() {

    var lat,lon;

    getLocation();

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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        $('body').append("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
}
angular.module('equipmentsApp', [
    'equipmentsApp.controllers','favoriteFilter'
]);
angular.module('favoriteFilter', [])
    .filter('favorite',function(){
        return function(equipmentsToFilter){
            var i, result =[];

            for(i=0;i<equipmentsToFilter.length;i++){
                //TODO Is Checked non fonctionnel ici (pas rebindé à chaque fois)
                if(equipmentsToFilter[i].checked){
                    result.push(equipmentsToFilter[i]);
                }
            }
            return result;
        };
    });