console.log('client.js sourced');
var myApp = angular.module('myApp', []);

myApp.controller('MyController', function($http, $scope) {

  $scope.test = "blue";
  $scope.ingData = [];

  
  $http.get('/getIngredientList').then(function(response){
    console.log('GET response data:', response.data);
    $scope.ingData = response.data;
    console.log('ingData:', $scope.ingData);
  });

});
