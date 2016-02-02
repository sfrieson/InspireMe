var api = angular.module('ApiServices', []);

api.factory('DribbbleFactory', ['$http', function($http){
    var apiInterface = {};
    // var baseUrl = "https://api.dribbble.com/v1/";

    apiInterface.get = function () {
        return $http.get('/api/helper?api=Dribbble');
    };

    apiInterface.search = function(params) {
        return $http.get(baseUrl + params + access);
    };
    return apiInterface;
}]);

api.factory('BehanceFactory', ['$http', function($http){
    var apiInterface = {};
    // var baseUrl = "http://behance.net/v2/projects/";

    apiInterface.get = function () {
        return $http.get('/api/helper?api=Behance');
    };

    apiInterface.search = function(params) {
        return $http.get(baseUrl + params + access);
    };

    return apiInterface;
}]);

api.factory('FavoritesFactory', function(){
    var apiInterface = {};

    return apiInterface;
});
