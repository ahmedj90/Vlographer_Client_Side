/*
@Ed J.
holds all of the main routing for each of your pages. Typically you will see applications using angularJs’ built inngRoute component, or the third party ui-router component.
*/

 
(function() {

    //1- This is only reference to the module defined in app.js
    var vlographerApp = angular.module('vlographerApp');
    
    // configure our routes
    vlographerApp.config(function($routeProvider, $locationProvider) {
            
            $routeProvider            
            .when('/', {    // route for the home page
                templateUrl : 'app/component/home/home.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
             .when('/Recommendations', {    // route for the home page
                templateUrl : 'app/component/home/home.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
             .when('/genres', {    // route for the home page
                templateUrl : 'app/component/genres/genres.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
            .when('/youtube-channels/:genre', {    // route for the home page
                templateUrl : 'app/component/genre_channels/genre_channels.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
            .when('/:chid/:channelName', {    // route for the home page
                templateUrl : 'app/shared/channel/channel.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
            .when('/search/:topicId/:topic', {    // route for the home page
                templateUrl : 'app/component/search_result/search_result.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            })
             .when('/favorites', {    // route for the home page
                templateUrl : 'app/component/user_likes/user_likes.tpl.html',
                //controller  : 'homeCtrl'                //we define controller in the sampe HTML template because 
                                                          //some pages have 2 controllers
            });
            
             
            // use the HTML5 History API to hide # in urls. We need to put "   <base href="/angularjs/Routes/"> " in the head of our html 
            $locationProvider.html5Mode(true);
        
    }).run(function($rootScope, cfpLoadingBar, $templateCache, Page){
           
        
            $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
                //console.log(event, current, previous, rejection)
               cfpLoadingBar.complete();
                console.log("Failed!");
            });
        
            $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
               cfpLoadingBar.start();
                console.log("started now...");
                 
                 //disable cache
                 if (typeof(current) !== 'undefined'){
                    $templateCache.remove(current.templateUrl);
                 }
                 
            });  
        
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
              cfpLoadingBar.complete();
                console.log("Done success!");
            });

        
            
       });//end run
   

})();
  