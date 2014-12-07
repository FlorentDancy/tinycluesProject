angular.module('favoriteFilter', [])
    .filter('favorite',function($scope){
        return function(equipmentsToFilter){
            var i;

            for(i=0;i<equipmentsToFilter.length;i++){
                if(equipmentsToFilter[i].checked){
                    $scope.favorites.push(equipmentsToFilter[i])
                }
            }
            return $scope.favorites;
        };
    });