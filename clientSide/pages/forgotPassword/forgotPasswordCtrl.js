// about controller
angular.module("myApp")
.controller("forgotPasswordCtrl", function ($scope,$window,$http) {

    var q=['What was the name of your first pet?','What was the name of your childhood best friend?']

    $scope.submit = function(){
        $http({
            method : 'POST',
            url: 'http://localhost:3000/users/restorePassword',
            data: { userName: $scope.username, questions: q, answers: [$scope.q1,$scope.q2] }

        }).then(function success(response){ 
            var p=response.data[0].password
            if(response.data=="your answars are incorrect"){ $window.alert("Error in one or more fields")}
            else{
            $window.alert("your password was seccesfully restored:     "+p);
            $window.location.href = "#!/"
            }

        }, function myError(response){
            $window.alert("Error in one or more fields")
        });


    };

});