

angular.module("myApp")
.controller("singlePoiCtrl", function ($rootScope,$scope,$window,$http) {
    $scope.poiName=$rootScope.currPoi.name;
    $http({
        method : 'GET',
        url: 'http://localhost:3000/poi/getTwoLastReview/'+$scope.poiName,
        
    }).then(function success(response){
        $scope.num_of_viewers=$rootScope.currPoi.num_of_viewers;
        $scope.description=$rootScope.currPoi.desc;
        $scope.rank=$rootScope.currPoi.rank;
        $scope.rev1=response.data.rev1;
        $scope.rev2=response.data.rev2;
        $scope.background={
            "color": "white",
            "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
            "background-image": "url('"+$rootScope.currPoi.url+"')",
            "opacity": "0.5",
            "background-repeat": "no-repeat",
            "background-size": "900px 300px", 
            "width": "100%", 
            "height": "50%"
        }
        $rootScope.currPoi.url;

    }, function myError(response){
        window.alert("poi Details unavilable")
        $window.location.href = $rootScope.loc
    });  
    
    $scope.back=function(){
        $window.location.href = $rootScope.loc

    }

    $scope.favoritss=function(name){
        if($rootScope.dic[name]=="add to favorits"){//add to favorits
            $rootScope.dic[name]="delete from favoriets"
            $rootScope.counter=$rootScope.counter+1;
            
    
        }
        else{ //delete from favorits
            $rootScope.dic[name]="add to favorits"
            if($rootScope.counter>0){
                $rootScope.counter=$rootScope.counter-1
            }
        }
    }


    $scope.isRegister=function(){
        if($rootScope.userName==="guest"){return false}
        else return true;
   }
    
    
    
});