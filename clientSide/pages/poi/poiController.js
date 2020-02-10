// poi controller
angular.module("myApp")
.controller("poiController", function ($scope,$http,$window,$rootScope,$location) {   //what services this controller is use
   
    $scope.categories=["food","shoping","atractions","hotels","all category"];
    $rootScope.all=[]
    $scope.atractions=[]
    $scope.food=[]
    $scope.hotels=[]
    $scope.shoping=[]
    $scope.selectedCategoryToShow=[]
    $scope.allcategory=false
    $scope.spesificCategory=true
    $scope.byRank=true
    $scope.byName=true
    $scope.noByName=true

    $scope.sorted=[]

    $http({
        method : 'GET',
        url: 'http://localhost:3000/poi/getAllPointsOfInterest',
        
    }).then(function success(response){
        $scope.atractions=response.data.atractions
        $scope.food=response.data.food
        $scope.hotels=response.data.hotels
        $scope.shoping=response.data.shoping
        for(var i=0;i<$scope.atractions.length;i++){$rootScope.all.push($scope.atractions[i])}
        for(var i=0;i<$scope.food.length;i++){$rootScope.all.push($scope.food[i])}
        for(var i=0;i<$scope.hotels.length;i++){$rootScope.all.push($scope.hotels[i])}
        for(var i=0;i<$scope.shoping.length;i++){$rootScope.all.push($scope.shoping[i])}
    }, function myError(response){
        window.alert("ll") //TODo
        $window.location.href = "#!/"
    });    


    $scope.updateCategory=function(selectedCategory){
        if(selectedCategory=="all category"){
            $scope.allcategory=false 
            $scope.spesificCategory=true
            $scope.byRank=true
            $scope.byName=true
            $scope.noByName=true
        }
        else{
         if(selectedCategory=="food"){$scope.selectedCategoryToShow=$scope.food}
        else if(selectedCategory=="shoping"){$scope.selectedCategoryToShow=$scope.shoping}
         else if(selectedCategory=="hotels"){$scope.selectedCategoryToShow=$scope.hotels}
         else if(selectedCategory=="atractions"){$scope.selectedCategoryToShow=$scope.atractions}    
         $scope.allcategory=true
         $scope.spesificCategory=false
         $scope.byRank=true
         $scope.byName=true
         $scope.noByName=true
        }
    }

    $scope.searchByName=function(){
        var flag=0;
        for(var i=0;i<$rootScope.all.length;i++){
            if($rootScope.all[i].name==$scope.poiByName){
                $scope.poiByName=$scope.all[i]
                $scope.byName=false
                $scope.noByName=true
                $scope.allcategory=true
                $scope.spesificCategory=true
                $scope.byRank=true 
                flag=1; 
                break
        }
        }
        if(flag==0){
            $scope.noByName=false    
            $scope.byName=true
            $scope.allcategory=true
            $scope.spesificCategory=true
            $scope.byRank=true 
        }

    }



    $scope.sort=function(){
        $scope.allcategory=true
        $scope.spesificCategory=true
        $scope.byName=true
        $scope.noByName=true
       
       for(var i=0; i<$scope.atractions.length;i++) {$scope.sorted.push($scope.atractions[i])}
       for(var i=0; i<$scope.food.length;i++) {$scope.sorted.push($scope.food[i])}
       for(var i=0; i<$scope.hotels.length;i++) {$scope.sorted.push($scope.hotels[i])}
       for(var i=0; i<$scope.shoping.length;i++) {$scope.sorted.push($scope.shoping[i])}
        $scope.sorted.sort(function(a, b){return b.rank - a.rank});    
        $scope.byRank=false
       
  


       
      

   }

   $scope.isRegister=function(){
        if($rootScope.userName==="guest"){return false}
        else return true;
   }

$scope.favorits=function(name){
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
   
$scope.saceFavoritsInServer=function(){
    $http({
        method : 'get',
        url: 'http://localhost:3000/private/poi/getAllFavoritePOints',
        headers : {
            'x-auth-token': $window.sessionStorage.getItem("token")
        }

    }).then(function success(response){
       var poi=response.data.pois
       var pois=[]
       for(var i=0;i<poi.length;i++){
           pois.push(poi[i].name)
       }
       for(var key in $rootScope.dic) {
 
         if( ($rootScope.dic[key]=="delete from favoriets") && !(pois.includes(key)) )  {  //now in favorit and before was not
            $http({
                method : 'GET',
                url: 'http://localhost:3000/private/poi/addPointToFavorite/'+key,
                headers : {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
                
            }).then(function success(response){
            }, function myError(response){
                $window.location.href = "#!/"
            }); 
        }
        else if($rootScope.dic[key]=="add to favorits" && pois.includes(key)) {  //now no in favorit and before was in 
            $window.alert(key)

            $http({
                method : 'GET',
                url: 'http://localhost:3000/private/poi/removePointFromFavorite/'+key,
                headers : {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
                
            }).then(function success(response){
            }, function myError(response){
                window.alert("ll") //TODo
                $window.location.href = "#!/"
            });    
        }  
        
      }
}
,function myError(response){
    window.alert("ll") //TODo
    $window.location.href = "#!/"
});  
}  

$scope.rank_and_review=function(name){
    $rootScope.makor="#!/poi"
    $rootScope.curReview=name
    $window.location.href = "#!/rank"
}


$scope.showDit=function(poi){
    $rootScope.currPoi=poi;
    $rootScope.loc='#!/poi';
    $window.location.href = "#!/singlePoint";
}

});



