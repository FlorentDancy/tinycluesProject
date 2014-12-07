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