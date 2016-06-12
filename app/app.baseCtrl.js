/*
This is the base Controller that raps the entir body
@Ed J.
*/

angular.module('vlographerApp')
  .controller('baseCtrl',['$scope', 'SERVER_BASE_URL', 'userFactory', 'Page', function($scope, SERVER_BASE_URL, userFactory, Page){    
       $scope.Page = Page; 
      
       $scope.SERVER_BASE_URL=SERVER_BASE_URL;              
           
       //set isSignedIn var for the whole app to use it. Also load user info (to show in menu and use around the app if singed in)
       if(userFactory.isSignedin()==true)
       {               
           $scope.isSignedIn=true;                                  
       }
       else{
           $scope.isSignedIn=false;        
           //signIn();
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
            }, function error(errors) {                 
                 console.log("Error:" + errors.data.messages.toString(),  errors); // "failure"
                 userFactory.signIn(params2); 
            });  
      }
      
      //function to go back in browser
      $scope.goBack = function() {
          window.history.back();
      };
       
  }]);
