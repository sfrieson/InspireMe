var ctrl = angular.module('MainControllers', []);
ctrl.controller('ArtworkController', ['$scope','$http','DribbbleFactory', 'BehanceFactory', function ($scope, $http, DribbbleFactory, BehanceFactory) {
    $scope.results = [];

    var getDribbbles = function(){
        DribbbleFactory.get().then(function(response){
            console.log(response);
            $scope.results = $scope.results.concat( dribbbleResults(response) );
        });
    };

    var getBehance = function(){
        BehanceFactory.get().then(function(response){
            console.log(response);
            $scope.results = $scope.results.concat( behanceResults(response) );
        });
    };
    getDribbbles();
    getBehance();
}]);

function dribbbleResults(response){
    if(!response.data) return response;
    data = [];
    for (var i = 0; i < response.data.length; i++) {
        var current = response.data[i];
        // console.log(current);
        var parsed = {};
        parsed.id = current.id;
        parsed.title = current.title;
        parsed.user = current.user.username;
        parsed.user_url = current.user.links.web;
        parsed.desc = current.description;
        if(/<[^>]*>/.test(parsed.desc)){ //remove HTML tags
            parsed.desc = parsed.desc.replace(/<[^>]*>/g, "");
        }
        parsed.img = current.images.normal;
        parsed.time = (new Date(current.created_at)).getTime() / 1000;
        parsed.url = current.html_url;
        parsed.src = "dribbble";

        data[i] = parsed;
    }

    return data;
}


function behanceResults(response){
    if(!response.data) return response;
    data = [];
    for (var i = 0; i < response.data.projects.length; i++) {
        var current = response.data.projects[i];
        var parsed = {};
        // console.log(current);
        parsed.id = current.id;
        parsed.title = current.name;
        for (var j = 0; j < current.owners.length; j++) {
            if(parsed.user) parsed.user += ", "; //if there's already a user add a comma the second time through;
            parsed.user += current.owners[j].display_name;
            parsed.user_url = parsed.user_url || current.owners[j].url; //take only the first user's URL
        }
        parsed.desc = current.fields.join(" | ");
        parsed.img = current.covers['404']; //not an error. 404 is file size.
        parsed.time = current.published_on;
        parsed.url = current.url;
        parsed.src = "behance";

        data[i] = parsed;
    }

    return data;
}
