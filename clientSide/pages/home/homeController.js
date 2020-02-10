// home controller(logIn)
angular.module("myApp").controller("homeController", function ($http, $window, $scope, $rootScope) {
   
    if(isRegister()){$window.location.href = "#!/poiForusers"}

    function isRegister(){
        if($rootScope.userName==="guest"){return false}
        else return true;
   }

    $http({
        method : 'GET',
        url: 'http://localhost:3000/poi/getRandomPoi',

    }).then(function success(response){
        $scope.poi1=response.data.poi1;
        $scope.poi2=response.data.poi2;
        $scope.poi3=response.data.poi3;

    }, function myError(response){
        $window.alert("failed explorer")
    });





$scope.login=function(userName,password){
            $http({
                method : 'POST',
                url: 'http://localhost:3000/users/login',
                data: { userName: userName, password: password }

            }).then(function success(response){
                if(response.data=="invalid userName or password"){$window.alert("invalid password or username")}
                else{
                $rootScope.userName=userName;
                $window.sessionStorage.setItem("token",response.data);
                
                
                //take favorits
                $http({
                    method : 'get',
                    url: 'http://localhost:3000/private/poi/getAllFavoritePOints',
                    headers : {
                        'x-auth-token': $window.sessionStorage.getItem("token")
                    }
    
                }).then(function success(response){
                   var pois=response.data.pois
                    var favorits=[]
                    for(var i=0;i<pois.length;i++){
                        favorits.push(pois[i].name)
                    }
                   $rootScope.dic=updateDic(favorits)
                   $rootScope.counter=favorits.length
                    
                    //iniate all
                    $http({
                        method : 'GET',
                        url: 'http://localhost:3000/poi/getAllPointsOfInterest',
                        
                    }).then(function success(response){
                        $rootScope.all=[]
                        var atractions=response.data.atractions
                        var food=response.data.food
                        var hotels=response.data.hotels
                        var shoping=response.data.shoping
                        for(var i=0;i<atractions.length;i++){$rootScope.all.push(atractions[i])}
                        for(var i=0;i<food.length;i++){$rootScope.all.push(food[i])}
                        for(var i=0;i<hotels.length;i++){$rootScope.all.push(hotels[i])}
                        for(var i=0;i<shoping.length;i++){$rootScope.all.push(shoping[i])}
                    }, function myError(response){
                        $window.location.href = "#!/"
                    }); 


    
                }, function myError(response){
                    $window.location.href = "#!/"
                });
            }//else
                $window.location.href = "#!/poiForusers"
            }, function myError(response){
                window.alert("invalid userName or password")
                $window.location.href = "#!/"
            });
                

        
    }


    $scope.showDit=function(poi){
        $rootScope.currPoi=poi;
        $rootScope.loc='#!/home';
        $window.location.href = "#!/singlePoint";
    }

   
});



function updateDic(favorits){
    var dic={}
    dic["Criterion Restaurant"]="add to favorits"
    dic["Ace Cafe"]="add to favorits"
    dic["big ben"]="add to favorits"
    dic["Bond Street"]="add to favorits"
    dic["Buckingham Palace"]="add to favorits"
    dic["Covent Garden"]="add to favorits"
    dic["London Bridge"]="add to favorits"
    dic["London Eye"]="add to favorits"
    dic["London Marriott Hotel County Hall"]="add to favorits"
    dic["One Aldwych"]="add to favorits"
    dic["Oxford Street"]="add to favorits"
    dic["Petrus"]="add to favorits"
    dic["Regent Street"]="add to favorits"
    dic["Southampton Row"]="add to favorits"
    dic["The IVY"]="add to favorits"
    dic["Knightsbridge Hotel"]="add to favorits"
    dic["The Waldorf Hilton"]="add to favorits"
    dic["Tokyo Dinner"]="add to favorits"
    dic["Tottenham Court Road"]="add to favorits"
    dic["Tower Of London"]="add to favorits"
    for(var i=0;i<favorits.length;i++){
        dic[favorits[i]]="delete from favoriets"
    }
    return dic


}
