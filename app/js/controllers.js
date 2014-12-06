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