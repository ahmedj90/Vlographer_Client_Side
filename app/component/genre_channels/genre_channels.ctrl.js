 

angular.module('vlographerApp')
  .controller('genre_channelsCtrl',['$scope', 'genre_channelsFactory', 'channelFactory', '$routeParams', 'userFactory','DOMAIN', 'Page','$timeout', function($scope, genre_channelsFactory, channelFactory, $routeParams, userFactory, DOMAIN,Page, $timeout){    
      $scope.DOMAIN=DOMAIN;
      
      //var json=JSON.stringify('[{cat_icon:"glyphicons piano", GID:0, tag:"Comedy", CCID:8232}]');

      //var res= JSON.parse(json).slice(0, 1);                                     


      Page.setTitle('Vlographer | ' + $routeParams.genre.replace(/-/g," ")); 
      // alert($routeParams.genre);
      $scope.channelsReady=false;
      $scope.errors = [];
      //on load, get classes
      var currentPage =0;
      var itemsPerPage = 10;    
      $scope.busy=false;
      $scope.stopImport=false;
      $scope.channels =[];
      $scope.title=$routeParams.genre.replace(/-/g," ");
      //url received genre
      $scope.genre=$routeParams.genre;
    
  
      
      function signIn()
      {
          var params={};   
            params['client']='web';           
           
            var params2={};  //default user 
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
                getMoreChannels();
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 userFactory.signIn(params2);   
                 getMoreChannels();
            });  
      }
      
      
      
      
      //load more data
      $scope.loadMore= function () {
            if (!$scope.busy ) 
            {           
                 if(userFactory.isSignedin())
                  {                      
                       getMoreChannels();
                  }
                  else
                  {
                      signIn();                        
                  }

            }                   
      }

      function getMoreChannels()
      {
                   
            getChannels(currentPage * itemsPerPage, itemsPerPage);  
            currentPage++; 
      }
      
      $scope.like_channel=function(index, CHID){
          $scope.channels[index].liked = true;
          var params={};
          params["chid"]=CHID;
          
          channelFactory.event_channel_like(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){
                          //alert('success');
                      $scope.busy=false;
                    }
                    else{
                        console.log('Failed to like channel :/' + responses[0].data.messages.toString());
                        $scope.errors.push("Hrm.. This didn't work for some reason.");
                        //log error in db
                    }
            }, function error(errors) {
                 //log error in db
                 $scope.errors = "Did you lose the connection? "; // +  $scope.errors.concat(errors.data.messages);                    
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 $scope.busy=false;
            }); 
      }
      
      function event_channels_seen(CHID_arr){        
          if(CHID_arr.length<=0)
              return;
          
          var params={};
          params["seen_chid_array"]= "[" + CHID_arr.join(",") + "]";
          
          channelFactory.event_channel_seen(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){
                        // alert('set as seen');
                    }
                    else{
                        console.log('Failed to like channel :/' + responses[0].data.messages.toString());                        
                    }
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"                
            }); 
      }
      
      //shuffle an array
      function shuffle (array) {
          var i = 0
            , j = 0
            , temp = null

          for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
      }

     
      function getChannels(offset, limit)
      {
        if ($scope.busy)        
            return;
                 
        $scope.busy=true;
          
        var params={};
        params["limit"]=limit;
        params["offset"]=offset;
        params["genreId"]=$scope.genre;
          
        genre_channelsFactory.getGenreChannels(params)
            .then(function success(responses) {
                  if(responses[0].data !=null &&  responses[0].data.success==true){
                      
                        if(responses[0].data.success==true && responses[0].data.data.length==0)
                        {                            
                             $scope.stopImport = true;                             
                            // alert('no more channels');                             
                        }
                        var CHID_arr=[];
                      
                        for (var i = 0 ; i < responses[0].data.data.length; i++){                         
                            if(responses[0].data.data[i].categories !== null && responses[0].data.data[i].categories!=='')
                                responses[0].data.data[i].categories = JSON.parse(responses[0].data.data[i].categories).slice(0, 2);                                     

                            responses[0].data.data[i].liked = false;                      
                            CHID_arr[i]=responses[0].data.data[i].CHID;
                                
                            // *** REMOVE *****
                            responses[0].data.data[i].high_thumb_url = responses[0].data.data[i].high_thumb_url.replace("https:\\","https://").replace("\\","/").replace("vi\\","vi/");                         
                            
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

                        shuffle(responses[0].data.data);
                        //when all data received back successfully, add "selected" flag to all dropdown list sources                      
                        $scope.channels = $scope.channels.concat(responses[0].data.data);
                      
                       
                        var event_timer = $timeout( function(){
                            event_channels_seen(CHID_arr);                            
                        }, 12000); // pull every 5 seconds
                      
                        $scope.$on('$destroy', function(){
                         // alert('destroied');
                          $timeout.cancel(event_timer);
                        });
                      
                        //cache data           
                        genre_channelsFactory.setCacheData("channels",  $scope.channels);                      
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

