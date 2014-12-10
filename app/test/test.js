describe('Unit: equipmentsApp', function() {

    beforeEach(angular.mock.module('getCurrentLocation'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('MainController', {
            $scope: scope
        });
    }));

    it('should define new values to currentLat and currentLon',
        function() {

            expect(currentLat).toEqual(0);


            var getLocation = function(){

                getLocation.deferred = $q.defer();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){
                        showPosition(position);
                        getLocation.deferred.resolve();
                    });
                } else {
                    $('body').append("Geolocation is not supported by this browser.");
                    getLocation.deferred.reject("Ca ne MARCHE PAS !");
                }
                return getLocation.deferred.promise;

            };

            function showPosition(position) {
                currentLat = position.coords.latitude;
                currentLon = position.coords.longitude;
            }

            expect(currentLat).not.toEqual(0);
        });


});