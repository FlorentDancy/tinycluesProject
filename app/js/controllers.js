angular.module('equipmentsApp.controllers', [])
    .controller('equipmentsController', function($scope/*,$resource*/) {

      $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 8 };

      getLocation();

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
        $scope.map = { center: { latitude: $scope.currentLat, longitude: $scope.currentLon }, zoom: 8 };

      }


    });