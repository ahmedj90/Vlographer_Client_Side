 

angular.module('vlographerApp')
  .controller('user_likesCtrl',['$scope', 'user_likesFactory', 'channelFactory', '$routeParams', 'userFactory', 'Page', function($scope, user_likesFactory, channelFactory, $routeParams, userFactory, Page){    
       Page.setTitle('Vlographer | Favorites');     
      $scope.stopImport=false;
      $scope.enable_scroller=false;
      $scope.channelsReady=false;
      $scope.errors = [];
      //on load, get classes
      var currentPage =0;
      var itemsPerPage = 10;    
      $scope.busy=false;      
      $scope.channels =[];
      $scope.page="fav";
      
      if(userFactory.isSignedin())
      {                      
          getChannels(currentPage * itemsPerPage, itemsPerPage);
           //$scope.stopImport=false; 
          $scope.enable_scroller=true;;
      }
      else
      {
          signIn();                        
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
                     getMoreChannels();  
                }  
                getChannels(currentPage * itemsPerPage, itemsPerPage);  
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 userFactory.signIn(params2);   
                 getChannels(currentPage * itemsPerPage, itemsPerPage);  
            });  
      }
            
      //load more data
      $scope.loadMore= function () {
            if (!$scope.busy ) 
            {           
                            
                       getMoreChannels();
               
            }                   
      }

      function getMoreChannels()
      {
            currentPage++;        
            getChannels(currentPage * itemsPerPage, itemsPerPage);  
      }
      
      
     
      function getChannels(offset, limit)
      {
        if ($scope.busy)        
            return;
                 
        $scope.busy=true;
          
        var params={};
        params["limit"]=limit;
        params["offset"]=offset;
    
          
        user_likesFactory.getChannels(params)
            .then(function success(responses) {
                  if(responses[0].data !=null &&  responses[0].data.success==true){
                      
                        if(responses[0].data.success==true && responses[0].data.data.length==0)
                        {                            
                             $scope.stopImport = true;                             
                            // alert('no more channels');                             
                        }
                      
                      
                        for (var i = 0 ; i < responses[0].data.data.length; i++){
                                                        
                               
                            if(responses[0].data.data[i].post_interval>=1 && responses[0].data.data[i].post_interval<=2)
                            {
                                responses[0].data.data[i].post_interval_text="Posts daily";
                            }
                            else if(responses[0].data.data[i].post_interval>2 && responses[0].data.data[i].post_interval<6)
                            {
                                responses[0].data.data[i].post_interval_text="Posts every other day";
                            }
                            else if(responses[0].data.data[i].post_interval>5 && responses[0].data.data[i].post_interval<9)
                            {
                                responses[0].data.data[i].post_interval_text="Posts weekly";
                            }
                            else if(responses[0].data.data[i].post_interval>8 && responses[0].data.data[i].post_interval<12)
                            {
                                responses[0].data.data[i].post_interval_text="Posts 3 times a month";
                            }
                            else if(responses[0].data.data[i].post_interval>11 && responses[0].data.data[i].post_interval<17)
                            {
                                responses[0].data.data[i].post_interval_text="Posts every two weeks";
                            }
                            else if(responses[0].data.data[i].post_interval>16 && responses[0].data.data[i].post_interval<22)
                            {
                                responses[0].data.data[i].post_interval_text="Posts every 3 weeks";
                            }
                            else if(responses[0].data.data[i].post_interval>21 && responses[0].data.data[i].post_interval<=31)
                            {
                                responses[0].data.data[i].post_interval_text="Posts once a month";
                            }
                            else
                            {
                               responses[0].data.data[i].post_interval_text="Posts randomly"; 
                            }
                        }

                    
                        //when all data received back successfully, add "selected" flag to all dropdown list sources                      
                        $scope.channels = $scope.channels.concat(responses[0].data.data);
                               
                        $scope.channelsReady=true;
                        $scope.busy=false;
                    }
                    else{
                        console.log('Failed to get channels :/' + responses[0].data.messages.toString());
                        $scope.errors.push("Shot! We couldn't get you channels, try to refresh. If it doesn't work, it's Ed's fault!");
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

