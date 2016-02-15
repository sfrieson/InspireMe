var ctrl = angular.module('MainControllers', []);

ctrl.controller('ArtworkController',
    ['$scope', '$timeout','DribbbleFactory', 'BehanceFactory', 'PxFactory', 'FavoritesFactory',
    function ($scope, $timeout, DribbbleFactory, BehanceFactory, PxFactory, FavoritesFactory) {
    $scope.results = [];
    $scope.dribbble = true;
    $scope.behance = true;
    $scope.px = true;
    $scope.inspireWin = false;

    var getDribbbles = function(page){
        DribbbleFactory.get(page).then(function(response){
                console.log(response);
                $scope.results = $scope.results.concat( dribbbleResults(response) );
        });

    };

    var getBehance = function(page){
        BehanceFactory.get(page).then(function(response){
            console.log(response);
            $scope.results = $scope.results.concat( behanceResults(response) );
        });
    };

    var get500px = function(page){
        PxFactory.get(page).then(function(response){
            console.log(response);
            $scope.results = $scope.results.concat( pxResults(response) );
        });
    };

    $scope.checkboxes = function (item) {
        if($scope[item.src]) return true; //if the scope variable with the same source name is true, then render
        return false;
    };

    $scope.add = function(id) {
        var index = $scope.results.map(function(result){return result.id;}).indexOf(id);
        console.log($scope.results[index]);
        FavoritesFactory.add($scope.results[index]).then(function(){});
        $scope.inspireWin = true;
        $timeout(function(){$scope.inspireWin = false;}, 2500);
    };
    $scope.savedResults = null; //placeholder to avoid another request after leaving favorites page
    $scope.showFavorites = function(){
        if (!$scope.savedResults) {
            $scope.savedResults = $scope.results;
            FavoritesFactory.get().then(function(response){$scope.results = response.data.favorites; console.log(response);});
        } else {
            $scope.results = $scope.savedResults; //restore results
            $scope.savedResults = null;
        }
    };

    var pageNumber = 1;
    $scope.apiCalls = function() {
        console.log(pageNumber);
        getDribbbles(pageNumber);
        getBehance(pageNumber);
        get500px(pageNumber);
        pageNumber++;
    };

    $scope.apiCalls();

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
        parsed.time = (new Date(current.created_at)).getTime() ;
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
        parsed.user="";
        for (var j = 0; j < current.owners.length; j++) {
            if(parsed.user) parsed.user += ", "; //if there's already a user add a comma the second time through;
            parsed.user += current.owners[j].display_name;
            parsed.user_url = parsed.user_url || current.owners[j].url; //take only the first user's URL
        }
        parsed.desc = current.fields.join(" | ");
        parsed.img = current.covers['404']; //not an error. 404 is file size.
        parsed.time = current.published_on * 1000;
        parsed.url = current.url;
        parsed.src = "behance";

        data[i] = parsed;
    }

    return data;
}

function pxResults(response){
    if(!response.data) return response;
    data = [];
    for (var i = 0; i < response.data.photos.length; i++) {
        var current = response.data.photos[i];
        var parsed = {};
        // console.log(current);
        parsed.id = current.id;
        parsed.title = current.name;
        parsed.user= current.user.fullname;
        parsed.user_url = "https://500px.com" + current.url;
        parsed.desc = current.description;
        if(/<[^>]*>/.test(parsed.desc)){ //remove HTML tags
            parsed.desc = parsed.desc.replace(/<[^>]*>/g, "");
        }
        parsed.img = current.image_url;
        parsed.time = (new Date(current.created_at)).getTime();
        parsed.url = "https://500px.com" + current.url;
        parsed.src = "px";

        data[i] = parsed;
    }

    return data;
}
