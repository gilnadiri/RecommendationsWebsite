// manualrank controller
angular.module("myApp")
.controller("manualrankCtrl", function ($scope,$window,$http,$rootScope) {
$scope.favorits=[]

//take favorits
$http({
    method : 'get',
    url: 'http://localhost:3000/private/poi/getAllFavoritePOints',
    headers : {
        'x-auth-token': $window.sessionStorage.getItem("token")
    }

}).then(function success(response){
   var pois=response.data.pois
    for(var i=0;i<pois.length;i++){
        $scope.favorits.push(pois[i].name)
    }
}, function myError(response){
    window.alert("ll")
    $window.location.href = "#!/"
});


$scope.save=function(){
    var allPairs=[]
    for(var i=0;i<$scope.favorits.length;i++){
        var pair = {name:$scope.favorits[i], rank:document.getElementById($scope.favorits[i]).value};
        allPairs.push(pair)
    }
    allPairs.sort(function(a, b){return a.rank - b.rank});  
    var ans="";
    for(var i=0;i<allPairs.length-1;i++){
        ans+=allPairs[i].name+"-";
    }
    ans+=allPairs[allPairs.length-1].name;

    $http({
        method : 'get',
        url: 'http://localhost:3000/private/poi/rankByUser/'+ans,
        headers : {
            'x-auth-token': $window.sessionStorage.getItem("token")
        }
    
    }).then(function success(response){
        $window.location.href = "#!/favorits"
    }, function myError(response){
        window.alert("ll")
        $window.location.href = "#!/"
    });
    

} 
});


