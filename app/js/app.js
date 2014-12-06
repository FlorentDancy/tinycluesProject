angular.module('equipmentsApp.controllers', []).
    controller('equipmentsController', function($scope) {
      $scope.equipments = [
        {
          name: "Maison",
          adress: "51 Rue de Charonne",
          postalCode: 75011,
          latitude: 50,
          longitude: 50
        },
        {
          name: "Maison",
          adress: "51 Rue de Charonne",
          postalCode: 75011,
          latitude: 50,
          longitude: 50
        }
      ];
    });
$( document ).ready(function() {

    var lat,lon;

    getLocation();

    var urlParis = 'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/';
    var token= "475bd14e06b3adaee2a6209b5ffc174d3837b1101e467e25689f6a029e66b466";
    var cid = "27,29";
    var offset = 0;
    var limit= 10;
    var radius= 1000;

    $.ajax({
        type: "GET",
        url: urlParis,
        data: { token: token, cid: cid, offset: offset, limit: limit, lat: lat, lon: lon, radius:radius }
    })
    .done(function( data ) {
        console.log(data);
    });

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
    'equipmentsApp.controllers'
]);