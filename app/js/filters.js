angular.module('favoriteFilter', [])
    .filter('favorite',function(favoritesManager){
        return function(equipmentsToFilter){
            var i, result =[];

            if(equipmentsToFilter){
                for(i=0;i<equipmentsToFilter.length;i++){
                    if(equipmentsToFilter[i].checked){
                        result.push(equipmentsToFilter[i]);
                    }
                }
                favoritesManager.setFavorites(result);
            }
            else{
                console.log("Tu t'es planté Jack");
            }


            return result;
        };
    });