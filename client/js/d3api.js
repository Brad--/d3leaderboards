var API_KEY = "3ksveer2u9qz9dmwd3g73kmfj6pky64c";
var API_URL = "https://us.api.battle.net/d3/profile/";
var locale = "en_US";
// battletag%23####/?locale=en_US&api_key=API_KEY

var app = angular.module('profileApp', []);
app.controller("ProfileController", ['$http', '$scope', ProfileController]);

function ProfileController($http, $scope) {
    var profile = this;
    
    $scope.data;
    $scope.display;
    $scope.show = false;
    $scope.invalid = false;
    
    $scope.getProfile = function(battletag) {
        var validTag = checkBattleTag(battletag);
        if(validTag){
            battletag = battletag.replace('#', '%23');
            $scope.invalid = false;
            
            $http.get(constructCall(battletag))
                .then(function(data){
                    if(data.data.code === "NOTFOUND") {
                        $scope.invalid = true;
                    } else {
                        $scope.data = data.data;
                        $scope.display = data.data;
                        $scope.show = true;
                        console.log($scope.display);
                    }
                })
        }
        else {
            $scope.invalid = true;
            $scope.show = false;
        }
    }
    $scope.loadLeaderboards = function() {
        console.log("Sup");
    }
}

var checkBattleTag = function(battletag) {
    var pattern = /\w+#\d{4}/;
    return pattern.test(battletag);
}

var constructCall = function(battletag) {
    return API_URL + battletag + "/?" + locale + "&apikey=" + API_KEY;
}