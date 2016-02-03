var ctrl = angular.module('MainControllers', []);
ctrl.controller('ArtworkController', ['$scope','$http','DribbbleFactory', 'BehanceFactory', function ($scope, $http, DribbbleFactory, BehanceFactory) {
    $scope.dresults = [
        {user: "jason"},
        {user: "andrew"}
    ];

    var getDribbbles = function(){
        DribbbleFactory.get().then(function(response){
            console.log(response);
            $scope.dresults= dribbbleResults(response);
        });
    };

    var getBehance = function(){
        BehanceFactory.get().then(function(response){
            console.log(response);
            $scope.bresults= behanceResults(response);
        });
    };
    getDribbbles();
    getBehance();
}]);

function dribbbleResults(response){
    data = [];
    for (var i = 0; i < response.data.length; i++) {
        var current = response.data[i];
        console.log(current);
        var parsed = {};
        parsed.id = current.id;
        parsed.title = current.title;
        parsed.user = current.user.username;
        parsed.user_url = current.user.links.web;
        parsed.desc = current.description;
        parsed.img = {small: current.images.teaser, large: current.images.normal};
        parsed.time = current.created_at;
        parsed.url = current.projects_url;

        data[i] = parsed;
    }

    return data;
}


function behanceResults(response){
    data = [];
    for (var i = 0; i < response.data.projects.length; i++) {
        var current = response.data.projects[i];
        var parsed = {};
        console.log(current);
        parsed.id = current.id;
        parsed.title = current.name;
        for (var j = 0; j < current.owners.length; j++) {
            if(parsed.user) parsed.user += ", "; //if there's already a user add a comma the second time through;
            parsed.user += current.owners[j].display_name;
            parsed.user_url = parsed.user_url || current.owners[j].url; //take only the first user's URL
        }
        parsed.user = current.user.username; //group
        parsed.user_url = current.user.links.web; //group
        parsed.desc = current.fields.join(" | ");
        parsed.img = {small: current.covers['202'], large: current.covers['404']};
        parsed.time = current.published_on;
        parsed.url = current.url;

        data[i] = parsed;
    }

    return data;
}
