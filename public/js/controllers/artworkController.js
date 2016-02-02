var ctrl = angular.module('MainControllers', []);
ctrl.controller('ArtworkController', ['$scope','$http','DribbbleFactory', 'BehanceFactory', function ($scope, $http, DribbbleFactory, BehanceFactory) {
    $scope.dresults = [
        {user: "jason"},
        {user: "andrew"}
    ];

    var getDribbbles = function(){
        DribbbleFactory.get().then(function(response){
            console.log(response);
            $scope.dresults= response.data;
        });
    };

    var getBehance = function(){
        BehanceFactory.get().then(function(response){
            console.log(response);
            $scope.bresults= response.data.projects;
        });
    };
    getDribbbles();
    getBehance();
}]);
