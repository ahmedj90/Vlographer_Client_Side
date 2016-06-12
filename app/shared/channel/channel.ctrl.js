 

angular.module('vlographerApp')
  .controller('channelCtrl',['$scope', 'channelFactory', 'videoFactory', '$routeParams', 'userFactory', 'Page' , 'DOMAIN', '$timeout', function($scope, channelFactory, videoFactory, $routeParams, userFactory, Page, DOMAIN, $timeout){    
      $scope.DOMAIN=DOMAIN;
      
      Page.setTitle('');
      $scope.errors = [];      
      $scope.busy=false;             
      $scope.title="";
      $scope.videosBusy=false;
      var currentPage =0;
      var itemsPerPage = 7;       
      $scope.stopImport=false;
      $scope.videos=[];
            
      
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
          getChannelInfo();
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
      
      
      function getChannelInfo()
      {       
        $scope.busy=true;          
        var params={};   
        params['chid']=$routeParams.chid;
          
        channelFactory.get_channel_info(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){                                            
                        
                        //randomize friends list (to display different 4 suggestions everytime)
                        shuffle(responses.data.data.channel_friends);
                        $scope.similarChannels = responses.data.data.channel_friends; 
                        $scope.social_medias = responses.data.data.social_media; 
                        
                        responses.data.data.channel_info[0].description= responses.data.data.channel_info[0].description.replace(/(?:\r\n|\r|\n)/g, '<br />');
                       responses.data.data.channel_info[0].custom_name=   responses.data.data.channel_info[0].name.replace(/([a-z])([A-Z])/g, '$1 $2');
                //           responses.data.data.channel_info[0].name.split(/(?=[A-Z])/).join(" ");
                    
                        //convert categories to json object
                        if(responses.data.data.channel_info[0].categories !== null && responses.data.data.channel_info[0].categories!=='')
                            responses.data.data.channel_info[0].categories = JSON.parse(responses.data.data.channel_info[0].categories).slice(0, 2);                             responses.data.data.channel_info[0].liked = false;                      

                        //check how often youtuber posts
                        if(responses.data.data.channel_info[0].post_interval>=1 && responses.data.data.channel_info[0].post_interval<=2)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts daily";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>2 && responses.data.data.channel_info[0].post_interval<6)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts every other day";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>5 && responses.data.data.channel_info[0].post_interval<9)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts weekly";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>8 && responses.data.data.channel_info[0].post_interval<12)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts 3 times a month";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>11 && responses.data.data.channel_info[0].post_interval<17)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts every two weeks";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>16 && responses.data.data.channel_info[0].post_interval<22)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts every 3 weeks";
                        }
                        else if(responses.data.data.channel_info[0].post_interval>21 && responses.data.data.channel_info[0].post_interval<=31)
                        {
                            responses.data.data.channel_info[0].post_interval_text="Posts once a month";
                        }
                        else
                        {
                           responses.data.data.channel_info[0].post_interval_text="Posts randomly"; 
                        }
                                              
                        $scope.channel = responses.data.data.channel_info[0];                     
                        setMetaTags();
                        $scope.busy=false;
                      
                        //set channels as seen after 12 seconds                                         
                        var subscribe = $timeout( function(){
                            subsribe_to_channel($scope.channel.CHID);                            
                        }, 15000); // pull every 5 seconds
                      
                        $scope.$on('$destroy', function(){
                         // alert('destroied');
                          $timeout.cancel(subscribe);
                        });

                    }
                    else{
                        console.log('Failed to get channel information :/ ' + responses.data.messages.toString());
                        $scope.errors.push("Shot! It seems like you've got an invalid link.");
                        //log error in db
                    }
            }, function error(errors) {
                 //log error in db
                 $scope.errors = "Shot! It seems like you've got an invalid link."; // +  $scope.errors.concat(errors.data.messages);               
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 $scope.busy=false;
            }); 
      }
      
     

     function setMetaTags()
      {
          Page.setTitle($scope.channel.name);
          Page.setDescription($scope.channel.description);
         
          Page.setTwitter({card:"summary", site:"@vlographer", creator:"@vlographer", title:$scope.channel.custom_name, description:$scope.channel.description, image:$scope.channel.img_link});
          
          Page.setFacebook({url:$scope.DOMAIN + '/'+ $scope.channel.CHID +'/' + $scope.channel.name.split(' ').join('-'), type:"", title:$scope.channel.custom_name, image:$scope.channel.img_link,description:$scope.channel.description, site_name:"Vlographer.com"});
      }
      
     function like_channel(CHID){
          
          var params={};
          params["chid"]=CHID;
          
          channelFactory.event_channel_like(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){
                          //alert('success');                      
                    }
                    else{
                        console.log('Failed to like channel :/' + responses[0].data.messages.toString());                        
                    }
            }, function error(errors) {
                 //log error in db                
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"                
            }); 
      }
      
       function subsribe_to_channel(CHID){
          //alert('here');
          var params={};
          params["chid"]=CHID;
          
          channelFactory.event_channel_subscribe(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){
                          //alert('success');                      
                    }
                    else{
                        console.log('Failed to subscribe to channel :/' + responses[0].data.messages.toString());                        
                    }
            }, function error(errors) {
                 //log error in db                
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"                
            }); 
      }
      
      function getChannelVideos(offset, limit)
      {       
        $scope.videosBusy=true;          
        var params={};   
        params['chid']=$routeParams.chid;
        params["limit"]=limit;
        params["offset"]=offset;
        
        videoFactory.get_channel_videos(params)
            .then(function success(responses) {
                  if(responses.data !=null &&  responses.data.success==true){ 
                      for (var i = 0 ; i < responses.data.data.length; i++){
                          //convert date to iso date
                          var datetime= responses.data.data[i].published_at.replace(/-/g, "/");
                          var video_date=new Date(datetime); 
                          responses.data.data[i].published_at_iso = video_date.toISOString();
                          
                          //convert seconds number to time hh:mm:ss
                
                             responses.data.data[i].duration=  secondsToTime(responses.data.data[i].duration_in_seconds);
                          
                            // *** REMOVE *****
                            responses.data.data[i].high_thumb_url =             responses.data.data[i].high_thumb_url.replace("https:\\","https://").replace("\\","/").replace("vi\\","vi/");                         
                            
                      }
                        $scope.videos =$scope.videos.concat( responses.data.data);;                        
                    }
                    else{
                        console.log('Could not get videos :/ ' + responses.data.messages.toString());
                        $scope.errors.push("Shot! It seems like you've got an invalid link.");
                        //log error in db
                    }
                    $scope.videosBusy=false;
            }, function error(errors) {
                 //log error in db
                 $scope.errors = "Shot! It seems like you've got an invalid link."; // +  $scope.errors.concat(errors.data.messages);               
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 $scope.videosBusy=false;
            }); 
      }
      
        //load more data
      $scope.loadMore= function () {
        if (!$scope.videosBusy ) 
        {                            
            getChannelVideos(currentPage * itemsPerPage, itemsPerPage);  
            currentPage++;  
        }
                   
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
      
    function secondsToTime (secondsNo) {
        d = Number(secondsNo);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }
      
    //**************************************************  JQUERY STUFF *******************************************************/
      
    //This is jquery Ready event equivelent
    angular.element(document).ready(function () {
        
         
       $scope.$watch('busy', function() {      
           setTimeout( function(){
               
             
            
               $('#description').readmore({
                  speed: 75,
                  moreLink: '<a href="#" style="color:rgb(42, 136, 196)">Show more</a>',
                  lessLink: '<a href="#"  style="color:rgb(42, 136, 196)">Show less</a>',
                  collapsedHeight: 160
                });                            
            }, 10);
            
      });
        //every time we get video, refresh time to convert it to friendly text
        $scope.$watch('videosBusy', function() {      
              setTimeout( function(){
                   $("time.time").timeago();   
                }, 1);
                              
        });
 
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

