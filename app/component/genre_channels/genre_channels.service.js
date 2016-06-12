
/* 
REST API Communication for suggested channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('genre_channelsFactory', ['$http', '$q', 'SERVER_URL', 'userFactory', function genre_channelsFactory ($http, $q, SERVER_URL, userFactory) {
     
    var urlBaseGenreChannels= SERVER_URL + 'genres/channels';
    var factoryName = "genre_channelsFactory";    
    var exports = {};
    var cacheData={};
    
     exports.isThereCacheData = function () {
        if(Object.keys(cacheData).length >0)
            return true;
         else
            return false;        
     };
    
     exports.setCacheData = function (keyName, data) {
        cacheData[keyName]=data;
     };
    
     exports.getCacheData = function (keyName) {
        return cacheData[keyName];
     };
    
    //get neighborhoods
    exports.getGenreChannels = function (params) {
        //params["uid"] = authFactory.getUid();
       params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
        
        
        return $q.all([
            $http({
                    //ignoreLoadingBar: true,
                    url: urlBaseGenreChannels,
                    dataType: 'json',
                    method: 'POST',
                    data: params,
                    headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                    }
                   }).error(function (data) {
                        console.log('HTTP request failed for getSuggestions method in ' + factoryName, data);
                   })
        ]);
         

    };       
    
    return exports;
}]);