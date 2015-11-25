var API_KEY = "3ksveer2u9qz9dmwd3g73kmfj6pky64c";
var API_URL = "https://us.api.battle.net/d3/profile/";
var locale = "en_US";
// battletag%23####/?locale=en_US&api_key=API_KEY

var app = angular.module('profileApp', []);
app.controller("ProfileController", ['$http', '$scope', ProfileController]);

function ProfileController($http, $scope) {
    var profile = this;
    
    $scope.data = {battleTag: "Fuck"};
    $scope.show = false;
    $scope.invalid = false;
    
    $scope.getProfile = function(battletag) {
        // var battletag = "b";
        console.log("btag " + battletag);
        var validTag = checkBattleTag(battletag);
        console.log(validTag);
        if(validTag){
            battletag = battletag.replace('#', '%23');
            $scope.invalid = false;
            
            $http.get(constructCall(battletag))
                .then(function(data){
                    $scope.data = data.data;
                    $scope.show = true;
                    console.log($scope.data);
                })
        }
        else {
            $scope.invalid = true;
        }
    }
}

var checkBattleTag = function(battletag) {
    var pattern = /\w+#\d{4}/;
    return pattern.test(battletag);
}

var constructCall = function(battletag) {
    return API_URL + battletag + "/?" + locale + "&apikey=" + API_KEY;
}