
/* 
REST API Communication for channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('videoFactory', ['$http', '$q', 'SERVER_URL', 'userFactory', function videoFactory ($http, $q, SERVER_URL, userFactory) {     var factoryName = "videoFactory";    
    var exports = {};
    
    var urlBaseGetVideos= SERVER_URL + 'channel/videos';   
    exports.get_channel_videos = function (params) {
        params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseGetVideos,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for get_channel_videos method in ' + factoryName, data);
                    });
    };
                                                                                                                                          
  
    return exports;
}]);