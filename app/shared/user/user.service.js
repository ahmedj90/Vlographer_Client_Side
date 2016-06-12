
/* 
REST API Communication for categories
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('userFactory', ['$http', '$cookies', 'SERVER_URL', function userFactory ($http, $cookies, SERVER_URL ) {    
    var factoryName = "userFactory";    
    var exports = {};

    var urlBaseAddUser= SERVER_URL + 'user/add';   
    exports.add_user = function (params) {
         
        return $http({
                    //ignoreLoadingBar: true,
                    url: urlBaseAddUser,
                    dataType: 'json',
                    method: 'POST',
                    data: params,
                    headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                    }
                }
              )
        .error(function (data) {
            console.log('HTTP request failed for add_user method in ' + factoryName, data);
        });
    };
    
    exports.isSignedin = function () {       
        var uid = $cookies.get('uid');
        
        if (uid!=null)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    
    exports.signIn = function (params) {       
        var expireDate = new Date();
        expireDate.setMonth(expireDate.getMonth() + 12);

        $cookies.put('uid', params['uid'], {'expires': expireDate});
       
    };
    
    exports.logout = function () {       
       $cookies.remove('uid');        
    };
    
    exports.getUid = function () {               
        return $cookies.get('uid');
    };
    
    
    return exports;
}]);