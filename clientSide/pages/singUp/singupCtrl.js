// singUp controller
angular.module("myApp")
.controller("singupCtrl", function ($scope,$window,$http) {
    $scope.sizeSelected=0;
    $scope.countries = ["Australia", "Bolivia", "China","Denemark", "Israel", "Latvia",
    "Monaco", "August", "Norway","Panama", "Switzerland", "USA"];
    // categories
  $scope.categories = ['food', 'shoping', 'hotels', 'atractions'];
  // Selected categories
  $scope.selection = [];
  // Toggle selection for a given category by name
  $scope.toggleSelection = function toggleSelection(cat) {
    var idx = $scope.selection.indexOf(cat);
    // Is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
      $scope.sizeSelected--;
    }

    // Is newly selected
    else {
      $scope.sizeSelected++;
      $scope.selection.push(cat);
    }
  };
  var q=['What was the name of your first pet?','What was the name of your childhood best friend?']
     
    $scope.submit = function(){
        $http({
            method : 'POST',
            url: 'http://localhost:3000/users/register',
            data: { userName: $scope.username, password: $scope.password, firstName: $scope.firstName,
            lastName: $scope.lastName, city: $scope.city, country: $scope.country, email: $scope.email,
            categoryOfInterest: $scope.selection, questions: q, answers: [$scope.q1,$scope.q2] }

        }).then(function success(response){ 
            $window.alert("ok, now please log in with username: "+$scope.username+" password: "+$scope.password)
            $window.location.href = "#!/"

        }, function myError(response){
            window.alert("registered fail")
            
        });

    };
});