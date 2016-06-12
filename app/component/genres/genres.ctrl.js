 

angular.module('vlographerApp')
  .controller('genresCtrl',['$scope', 'genresFactory', 'userFactory', '$window', 'Page', 'SERVER_BASE_URL', function($scope, genresFactory, userFactory, $window, Page, SERVER_BASE_URL){    
      Page.setTitle('Vlographer | Genres'); 
      $scope.errors = [];      
      $scope.busy=false;             
      $scope.title="";
      $scope.page="genres";
      
      if(userFactory.isSignedin())
      {                      
          onLoad();
      }
      else
      {
          signIn();    
      }
     
      function onLoad()
      {          
          //if signed in
          getGenres();
      }
      
      function signIn()
      {
          var params={};   
            params['client']='web';           
           
            var params2={};   
            params2['uid']= '89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd';
           
            userFactory.add_user(params)
            .then(function success(responses) {
                if(responses.data !=null &&  responses.data.success==true && responses.data.data.uid!=""){ 
                    params2['uid']= responses.data.data.uid;
                     userFactory.signIn(params2);                        
                }
                else{
                    console.log('Failed to sign in  :/ ' + responses.data.messages.toString());                        
                    userFactory.signIn(params2);   
                }  
                onLoad();
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                userFactory.signIn(params2);   
                  onLoad();
            });  
      }
      
       
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
                 $scope.errors.push ( "Did you lose the connection? "); // +  $scope.errors.concat(errors.data.messages);                    
                 console.log("Error:" + errors.data.messages,  errors); // "failure"
                 $scope.busy=false;
            }); 
      }
      
        $scope.genre_click=function (gid, text_GID){        
          if(gid<=0)
              return;
          
          var params={};
          params["gid"]= gid;
          
          genresFactory.genre_seen_event(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){
                        //alert('set gid');
                    }
                    else{
                        console.log('Failed to like channel :/' + responses[0].data.messages.toString());                        
                    }
                $window.location.href = 'youtube-channels/' + text_GID;
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"                
                $window.location.href = 'youtube-channels/' + text_GID;
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

