// rank controller
angular.module("myApp")
.controller("rankCtrl", function ($scope,$window,$http,$rootScope) {



    
    $scope.ranks=["1","2","3","4","5"]
    
   $scope.rank=function(rank,review){
    $http({
        method : 'GET',
        url: 'http://localhost:3000/private/poi/rankAndReviewPOint/'+$rootScope.curReview+'/'+rank+'/'+review,
        headers : {'x-auth-token': $window.sessionStorage.getItem("token")}
            
    }).then(function success(response){
        $window.location.href = $rootScope.makor
    }, function myError(response){
        window.alert("ll") //TODo
        $window.location.href = "#!/"
    });    


   }


  
    



 });