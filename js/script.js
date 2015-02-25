// define angular module/app
var formApp = angular.module('formApp', []);

// create angular controller and pass in $scope and $http
formApp.controller('formController', function($scope,$http){
  $scope.formData = {};
  $scope.date = new Date();
  $scope.datePlusOne = new Date(new Date().getTime()+(1*24*60*60*1000));
  $scope.datePlusTwo = new Date(new Date().getTime()+(2*24*60*60*1000));
  $scope.datePlusThree = new Date(new Date().getTime()+(3*24*60*60*1000));
  $scope.datePlusFour = new Date(new Date().getTime()+(4*24*60*60*1000));

  $scope.processForm = function() {
    $http({
      method  : 'POST',
      url     : 'http://dubishere.com/recruitment/demo.php',
      // url     : 'http://localhost:8888/dubTechnicalTest/TechnicalTestAngularJS/process.php',
      data    : $.param($scope.formData),  // pass in data as strings
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
    .success(function(data) {
      console.log(data);

      if (!data.success) {
        // if not successful, bind errors to error variables
        $scope.errorFirstName = data.errors.first_name;
        $scope.errorLastName = data.errors.last_name;
        $scope.errorEmail = data.errors.email;
        $scope.errorRegion = data.errors.region;
        $scope.errorSoftware = data.errors.software;
        $scope.errorTimes = data.errors.times;
      } else {
        // if successful, bind success message to message
        $scope.message = "Thank you requesting a Demonstration of our software. We will be in touch to confirm your request soon";
      }
    });
  };

  $scope.choices = [{id: 'choice1'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
  
  $scope.showAddChoice = function(choice) {
    if($scope.choices.length < 3) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };
  };

});
