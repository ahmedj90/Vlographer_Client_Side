
/* 
REST API Communication for suggested channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('genresFactory', ['$http', '$q', 'SERVER_URL', function genresFactory ($http, $q, SERVER_URL) {
     
   
    var factoryName = "homeFactory";    
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
    
    var urlBaseGetGenres= SERVER_URL + 'genres';   
    exports.getGenres = function (params) {
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseGetGenres,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for get_genres method in ' + factoryName, data);
                    });
    };   
    
    return exports;
}]);