angular.module('equipmentsApp.controllers', ['ngResource','appMaps'])
    .controller('EquipmentsController',function($scope,$q,$resource,getCurrentLocation) {

        $scope.mapPromise = getCurrentLocation.getLocation();

        $scope.mapPromise.then(function(){

            var currentLat = getCurrentLocation.getCurrentLat();
            var currentLon = getCurrentLocation.getCurrentLon();

            var temp1 = $resource(
                'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/?:path',
                {path:"@path"}
            );

            var temp2 = $resource(
                'https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?:path',
                {path:"@path"}
            );

            //TODO Pour modifier les paramètres à envoyer à l'API, c'est juste en dessous !
            var token = "ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1";
            var cid = "27,29,47,238,239,266,329,57,12,74,9,315,38,316,318,235,237,240,177,86,245,15,28,83,64,290,61,295,62,60,311,17,40,34";
            var offset = "0";
            var limit = "5";
            var radius = "1000";

            temp1.get({
                path: "token="+token+"&cid="+cid+"&offset="+offset+"&limit="+limit+"&lat="+currentLat+"&lon="+currentLon+"&radius=" + radius
            }, function(data) {
                $scope.equipments = data.data;
                angular.forEach($scope.equipments,function(value,key){
                    setTimeout(function(){
                        var eqId = value.id;

                        temp2.get({
                            path: "token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1&id=" + eqId
                        }, function(data) {
                            value.latitude = data.data[0].lat;
                            value.longitude = data.data[0].lon;
                        });
                    }, 200*key)
                });
            });
        });
    });

angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('MapController', function($scope, $q, getCurrentLocation, favoritesManager){
        
        $scope.mapPromise.then(function(){
            var currentLat = getCurrentLocation.getCurrentLat();
            var currentLon = getCurrentLocation.getCurrentLon();

            $scope.map = {
                center: {
                    latitude: currentLat,
                    longitude: currentLon
                },
                zoom: 14
            };

        });

        $scope.favoritesMarkers = [];

        var markers = [];

        //FIXME Bug quand on manipule les checkboxs, peut laisser le mauvais icon sur la map
        $scope.$watch(function() {
            return favoritesManager.getFavorites();
        }, function() {
            markers=[];
            for (var i = 0; i < favoritesManager.getFavorites().length; i++) {
                markers.push(
                    {
                        id: i+1,
                        latitude: favoritesManager.getFavorites()[i].latitude,
                        longitude: favoritesManager.getFavorites()[i].longitude,
                        name: favoritesManager.getFavorites()[i].name
                    }
                )
            }
            $scope.favoritesMarkers = markers;
        }, true);

    });