 

angular.module('vlographerApp')
  .controller('genresCtrl',['$scope', 'genresFactory', function($scope, genresFactory){    
      
      $scope.errors = [];      
      $scope.busy=false;             
      $scope.title="";
      
      //if signed in
      getGenres();
       
      function getGenres()
      {       
        $scope.busy=true;          
        var params={};   
          
        genresFactory.getGenres(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){                                            
                        $scope.genres = responses.data.data;                       
                        //cache data           
                        genresFactory.setCacheData("genres",  $scope.genres);                                             
                        $scope.busy=false;
                    }
                    else{
                        console.log('Failed to get generes :/' + responses.data.messages.toString());
                        $scope.errors.push("Shot! We couldn't get you genres, try to refresh. If it doesn't work, it's Ed's fault!");
                        //log error in db
                    }
            }, function error(errors) {
                 //log error in db
                 $scope.errors = "Did you lose the connection? "; // +  $scope.errors.concat(errors.data.messages);                    
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 $scope.busy=false;
            }); 
      }
      
    //**************************************************  JQUERY STUFF *******************************************************/
      
    //This is jquery Ready event equivelent
    angular.element(document).ready(function () {
        
        //set the device type variable on load
        checkDeviceType();      
        
        function checkDeviceType()
        {          
            //alert($('div.detect-device-class').text());
            if($('div.detect-device-class').text()=="mobile") //mobile
                $scope.isMobile= true;
            else    //desktop
                $scope.isMobile= false;
        }
     
        
        
            
    }); //end ready event
      
      
      
  }]); //end controller

