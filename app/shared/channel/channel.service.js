
/* 
REST API Communication for channels
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('channelFactory', ['$http', '$q', 'SERVER_URL', 'userFactory', function channelFactory ($http, $q, SERVER_URL, userFactory) {     var factoryName = "channelFactory";    
    var exports = {};
    
    var urlBaseLike= SERVER_URL + 'events/channel_like';   
    exports.event_channel_like = function (params) {
        params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseLike,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for event_channel_like method in ' + factoryName, data);
                    });
    };
     
    var urlBaseSubscribe= SERVER_URL + 'events/channel_subscribe';   
    exports.event_channel_subscribe = function (params) {
        params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseSubscribe,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for event_channel_subscribe method in ' + factoryName, data);
                    });
    };
        
        
                                                                                                                                           var urlBaseSeen= SERVER_URL + 'events/channels_seen';   
    exports.event_channel_seen = function (params) {
        params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseSeen,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for event_channel_like method in ' + factoryName, data);
                    });
    };
    
    
                                                                                                                                               var urlBaseGetChannelInfo= SERVER_URL + 'channel/get';   
    exports.get_channel_info = function (params) {
        params["uid"] =userFactory.getUid(); //"89fc6c6dcec293404284c6ef737f03ccf651e5add284b05aa0bdaaf8501e1cd76b0bdb02a3282644160d141c66a261dc7e27860f20ec9e66876f2a8729ab96dd";
      
        return $http({
                                //ignoreLoadingBar: true,
                                url: urlBaseGetChannelInfo,
                                dataType: 'json',
                                method: 'POST',
                                data: params,
                                headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                }
                            }
                          )
                    .error(function (data) {
                        console.log('HTTP request failed for event_channel_like method in ' + factoryName, data);
                    });
    };
    
  
    return exports;
}]);