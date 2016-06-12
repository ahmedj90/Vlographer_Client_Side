
/* 
REST API Communication for suggested channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('search_resultFactory', ['$http', '$q', 'SERVER_URL', 'userFactory', function search_resultFactory ($http, $q, SERVER_URL, userFactory) {
     
    var urlBaseSearchTopic= SERVER_URL + 'channels/topic';
    var factoryName = "search_resultFactory";    
    var exports = {};
  
    
    
    //get neighborhoods
    exports.getChannelsByTopic = function (params) {        
       params["uid"] =userFactory.getUid();         
        
        return $q.all([
            $http({
                    //ignoreLoadingBar: true,
                    url: urlBaseSearchTopic,
                    dataType: 'json',
                    method: 'POST',
                    data: params,
                    headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                    }
                   }).error(function (data) {
                        console.log('HTTP request failed for getChannelsByTopic method in ' + factoryName, data);
                   })
        ]);
         

    };       
    
    return exports;
}]);