angular.module('equipmentsApp.controllers', ['ngResource','appMaps'])
    .controller('equipmentsController',function($scope,$q,$resource,getCurrentLocation) {


        console.log('innit Eq ctrl');
        /*$scope.equipments = [
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
         ];*/

        $scope.mapReady = false;

        console.log("Je suis dans le equipmentsAPP");

        getCurrentLocation.getLocation().then(function(){
            console.log("Je suis ICI");
            var currentLat = getCurrentLocation.getCurrentLat();
            var currentLon = getCurrentLocation.getCurrentLon();

            console.log('ready');
            $scope.mapReady = true;

            // $scope.map = {
            //     center: {
            //         latitude: currentLat,
            //         longitude: currentLon
            //     },
            //     zoom: 15
            // };

            console.log("Je suis ICI2");

            var temp1 = $resource(
                'https://api.paris.fr/api/data/1.1/Equipements/get_geo_equipements/?:path',
                {path:"@path"}
            );

            var temp2 = $resource(
                'https://api.paris.fr/api/data/1.0/Equipements/get_equipement/?:path',
                {path:"@path"}
            );

            temp1.get({
                path: "token=ec8492667356ee806e5de5d0d322a51708b094a75abf07b0024edfa09ca25aa1&cid=27,29&offset=0&limit=10&lat="+currentLat+"&lon="+currentLon+"&radius=10000"
            }, function(data) {
                console.log("Ca marche !");
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
    .controller('mapCtrl', function($scope, $q, getCurrentLocation, favoritesManager){

        console.log('init Map ctrl');
        
        var currentLat = getCurrentLocation.getCurrentLat();
        var currentLon = getCurrentLocation.getCurrentLon();

        $scope.map = {
            center: {
                latitude: currentLat,
                longitude: currentLon
            },
            zoom: 15
        };
    
        //reject
        (function(){
            alert("Ca ne maaaaaarche pas !!")
        });

        //$scope.map = getCurrentLocation().getInitMat();

        $scope.favoritesMarkers = [];

        var markers = [];

        //FIXME Bug quand on manipule les checkboxs, peut laisser le mauvais icon sur la map
        $scope.$watch(function() {
            return favoritesManager.getFavorites();
        }, function() {
            console.log("Y'a du changement");
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