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