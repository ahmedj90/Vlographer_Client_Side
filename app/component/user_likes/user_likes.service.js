
/* 
REST API Communication for suggested channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('user_likesFactory', ['$http', '$q', 'SERVER_URL', 'userFactory', function user_likesFactory ($http, $q, SERVER_URL, userFactory) {
     
    var urlBaseGetChannels= SERVER_URL + 'channels/liked';
    var factoryName = "search_resultFactory";    
    var exports = {};
  
    
    
    //get neighborhoods
    exports.getChannels = function (params) {        
       params["uid"] =userFactory.getUid();         
        
        return $q.all([
            $http({
                    //ignoreLoadingBar: true,
                    url: urlBaseGetChannels,
                    dataType: 'json',
                    method: 'POST',
                    data: params,
                    headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                    }
                   }).error(function (data) {
                        console.log('HTTP request failed for getChannels method in ' + factoryName, data);
                   })
        ]);
         

    };       
    
    return exports;
}]);