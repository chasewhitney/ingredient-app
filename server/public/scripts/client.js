console.log('client.js sourced');
var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

myApp.controller('MyController', function($http, $scope) {

  $scope.ingredientDictionary = [];
  $scope.listToCheck = [];
  $scope.ingredientRatings = [];

  // GETs array of ingredients and ratings from server
  $http.get('/getIngredientList').then(function(response){
    console.log('GET response data:', response.data);
    $scope.ingredientDictionary = response.data;
    console.log('ingredientDictionary:', $scope.ingredientDictionary);
  });

  // Searches known ingredients list and returns matches with name and rating
  // If match isn't found, rating property becomes 'unknown'
  $scope.searchList = function(userIngredientList){
    console.log('in searchList');

    // var temp = "naPCa, myrrh, polyhydroxy acid, testfail extract, red raspberry extract, Saccharomyces lysate";
    // $scope.listToCheck = temp.split(", "); ///// <---TEMPORARY----^

    $scope.listToCheck = userIngredientList.split(", "); ///// TEMPORARY COMMENT

    console.log("listToCheck is:", $scope.listToCheck);
    $scope.ingredientRatings = [];
    for (var i = 0; i < $scope.listToCheck.length; i++) {
      var result = $scope.ingredientDictionary.filter(function( obj ) {
        return obj.name.toLowerCase() == $scope.listToCheck[i].toLowerCase();
      });
      if (result[0]) {
        $scope.ingredientRatings.push(result[0]);
      } else {
        $scope.ingredientRatings.push({'name': $scope.listToCheck[i], 'rating':'Unknown'})
      }
    }
    console.log('ingredientRatings:', $scope.ingredientRatings);
  };

});
