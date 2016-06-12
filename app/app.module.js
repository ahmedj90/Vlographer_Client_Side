/*
@Ed J. 
App.module.js is the start of your application, this is where you define the main app module and all of the app dependencies.  
*/
 


    // create the module and name it scotchApp
    var vlographerApp = angular.module('vlographerApp', ['ngRoute', 'cfp.loadingBar', 'cfp.loadingBarInterceptor', 'ngAnimate', 'infinite-scroll', 'angular.filter', 'ngOrderObjectBy',  'ngSanitize', 'ngCookies']);
    
     //Configuration variables
    vlographerApp.constant('SERVER_URL','http://localhost/vlographer_server/public/')  //http://52.1.120.142/api_v2/public/index.php/
                .constant('SERVER_BASE_URL','http://localhost/vlographer_server/public/') //http://52.1.120.142/api_v2/public/              
                .constant('DOMAIN','http://www.vlographer.com/');
    
   
    
    //config the loading bar
    vlographerApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        // display after it has been waiting for a response for over 100ms. 
        //cfpLoadingBarProvider.latencyThreshold = 500; 
    }]);
    
     
