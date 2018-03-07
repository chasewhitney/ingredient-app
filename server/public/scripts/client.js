console.log('client.js sourced');
var myApp = angular.module('myApp', []);

myApp.controller('MyController', function($http, $scope) {

  $scope.test = "blue";
  $scope.ingData = [];
  $scope.tempListString = "naPCa, myrrh, polyhydroxy acid, testfail extract, red raspberry extract, Saccharomyces lysate";
  $scope.tempList = [];
  $scope.ingRatings = [];

  // GETs array of ingredients and ratings from server
  $http.get('/getIngredientList').then(function(response){
    console.log('GET response data:', response.data);
    $scope.ingData = response.data;
    console.log('ingData:', $scope.ingData);
  });


$scope.searchList = function(userIngredientList){
  console.log('in searchList');

  $scope.tempList = userIngredientList.split(", ");
  console.log("tempList is:", $scope.tempList);

  $scope.ingRatings = [];
  for (var i = 0; i < $scope.tempList.length; i++) {
    var result = $scope.ingData.filter(function( obj ) {
      return obj.name.toLowerCase() == $scope.tempList[i].toLowerCase();
    });
    if (result[0]) {
      $scope.ingRatings.push(result[0]);
    } else {
      $scope.ingRatings.push({'name': $scope.tempList[i], 'rating':'Unknown'})
    }

  }

  console.log('ingRatings:', $scope.ingRatings);

};







});
