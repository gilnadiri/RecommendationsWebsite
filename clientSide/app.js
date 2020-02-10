let app = angular.module('myApp', ["ngRoute"]);



// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            // home-log in/register
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homCtrl'        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        //favorits
        .when('/favorits', {
            templateUrl: 'pages/favorits/favorits.html',
            controller : 'favoritsCtrl as favoritsCtrl'
        })

        //rank
        .when('/manualrank', {
            templateUrl: 'pages/manualrank/manualrank.html',
            controller : 'manualrankCtrl as manualrankCtrl'
        })

        //manualrank
        .when('/rank', {
            templateUrl: 'pages/rank/rank.html',
            controller : 'rankCtrl as rankCtrl'
        })
        //single point page
        .when('/singlePoint', {
            templateUrl: 'pages/singlePoi/singlePoi.html',
            controller : 'singlePoiCtrl as singlePoiCtrl'
        })


        //fogrot password
        .when('/forgotPassword', {
            templateUrl: 'pages/forgotPassword/forgotPassword.html',
            controller : 'forgotPasswordCtrl as forgotPasswordCtrl'
        })
        //sing up
        .when('/singUp', {
            templateUrl: 'pages/singUp/singUp.html',
            controller : 'singupCtrl as singupCtrl'
        })
        //poiForUsers
        .when('/poiForusers', {
            templateUrl: 'pages/poiForUsers/poiForUsers.html',
            controller : 'poiForUsersCtrl as poiForUsersCtrl'
        })
        //register
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });

});

// app.service('serverRequest', function(){
//     this.post=function(url,data,aref){
//         $http({
//             method : 'POST',
//             url: url,
//             data: data 

//         }).then(function success(response){
//             $rootScope.userName=userName;
//             $rootScope.token=response.data; //TODO save in session 
//             $window.location.href = aref;

//         }, function myError(response){
//             $window.location.href = "#!/"
//         });
//     }
// })


