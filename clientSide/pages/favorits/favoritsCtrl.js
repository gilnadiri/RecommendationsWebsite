// favorits controller
angular.module("myApp")
.controller("favoritsCtrl", function ($scope,$window,$http,$rootScope) {

    if(!isRegister()){$window.location.href = "#!/"}

    function isRegister(){
        if($rootScope.userName==="guest"){return false}
        else return true;
   }

    
    $scope.AllFavorits=iniate()
    $scope.showAll=false
    $scope.showRank=true
    $scope.showcategory=true
    $scope.sorted=[]
    $scope.category=[]
    $scope.showcategory=true
   


  
    

function iniate(){
        ans=[]
    for(var key in $rootScope.dic) {
        if($rootScope.dic[key]=="delete from favoriets")  { // in favorits
                ans.push(key)
        }
      }
        var answere=[]
         for(var i=0;i<$rootScope.all.length;i++){

        if(ans.includes($rootScope.all[i].name)){
            answere.push($rootScope.all[i])
           }
         }
    //$window.alert(answere[0])
    return answere  
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

$scope.showUserRank=function(){

}


 $scope.sort=function(){
     $scope.sorted=$scope.AllFavorits 
     $scope.sorted.sort(function(a, b){return b.rank - a.rank});    
     $scope.showRank=false
     $scope.showAll=true
     $scope.category=true
 }

 $scope.sortBycategory=function(){
    $scope.category=$scope.AllFavorits 
    $scope.sorted.sort(function(a, b){return b.category - a.category});    
    $scope.showcategory=false
    $scope.showAll=true
    $scope.showRank=true
 }

$scope.sort_by_user=function(){
    $window.location.href = "#!/manualrank"
}

 $scope.saveFavoritsInServer=function(){
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

            $http({
                method : 'GET',
                url: 'http://localhost:3000/private/poi/removePointFromFavorite/'+key,
                headers : {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
                
            }).then(function success(response){
            }, function myError(response){
                $window.location.href = "#!/"
            });    
        }  
        
      }
      $window.alert("your changes saved successfully")
}
,function myError(response){
    $window.location.href = "#!/"
});  
} 

$scope.rank_and_review=function(name){
    $rootScope.makor="#!/favorits"
    $rootScope.curReview=name
    $window.location.href = "#!/rank"
}


$scope.showDit=function(poi){
    $rootScope.currPoi=poi;
    $rootScope.loc='#!/favorits';
    $window.location.href = "#!/singlePoint";
}

 });