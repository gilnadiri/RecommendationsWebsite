// about controller
angular.module("myApp")
.controller("poiForUsersCtrl", function ($scope,$window,$http,$rootScope) {
   $scope.favorits=[]
   $scope.lastSaved=[]

    $http({
        method : 'GET',
        url: 'http://localhost:3000/private/poi/getTwoPopularPoints',
        headers : {
            'x-auth-token': $window.sessionStorage.getItem("token")
        }
    }).then(function success(response){
        $scope.favorits[0]=response.data.poi1
        $scope.favorits[1]=response.data.poi2
        
    }, function myError(response){
        
        $scope.popular="no such points"
    });
    
    $http({
        method : 'GET',
        url: 'http://localhost:3000/private/poi/getLastSavedPoi',
        headers : {
            'x-auth-token': $window.sessionStorage.getItem("token")
        }
    }).then(function success(response){
        $scope.lastSaved[0]=response.data.poi1
        $scope.lastSaved[1]=response.data.poi2
        
    }, function myError(response){
        $scope.saved="no such points"
    }); 

    $scope.logoff=function(){
        $rootScope.userName="guest";
        $window.location.href = "#!/"
    }


    $scope.showDit=function(poi){
        $rootScope.currPoi=poi;
        $rootScope.loc='#!/poiForusers';
        $window.location.href = "#!/singlePoint";
    }
    

    
});