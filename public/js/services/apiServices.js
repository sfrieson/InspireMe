var api = angular.module('ApiServices', []);

api.factory('DribbbleFactory', ['$http', function($http){
    var apiInterface = {};

    apiInterface.get = function () {
        return $http.get('/api/dribbble');
    };

    // apiInterface.search = function(params) {
    //     return $http.get(baseUrl + params + access);
    // };
    return apiInterface;
}]);

api.factory('BehanceFactory', ['$http', function($http){
    var apiInterface = {};

    apiInterface.get = function () {
        return $http.get('/api/behance');
    };

    // apiInterface.search = function(params) {
    //     return $http.get(baseUrl + params + access);
    // };

    return apiInterface;
}]);

api.factory('PxFactory', ['$http', function($http){
    var apiInterface = {};

    apiInterface.get = function () {
        return $http.get('/api/500px');
    };

    // apiInterface.search = function(params) {
    //     return $http.get(baseUrl + params + access);
    // };

    return apiInterface;
}]);

api.factory('FavoritesFactory', ['$http', function($http){
    var apiInterface = {};
    apiInterface.add = function (data) {
        return $http.post('/api/favorites', {favorite: data});
    };

    return apiInterface;
}]);
