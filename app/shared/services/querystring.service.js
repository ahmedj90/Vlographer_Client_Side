
/* 
Service to handle query strings in pages
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('QueryStringService', ['$location', function QueryStringService ($location) {
    
    var exports = {};
    
    //Method to get all query string params as object
    exports.getAllParams = function() {
        var qs = $location.search();       
        return qs;
    };
    
    //Method to get all non-null query string params as object
     exports.getAllNonNullParams = function() {
        var qs = $location.search();
        var ns={};
        for (var param in qs) {
            if (qs[param] != "null") {
                ns[param] = qs[param];
            }
        }
        return ns;
    };
    
     //Method to get specific query string params as object
     exports.getSpecificParams = function(filterObj) {
        var qs = $location.search();
        for (var param in filterObj) {
            if (param in qs) {
                filterObj[param] = qs[param];
            }
        }
        return filterObj;
    };
    
    return exports;
}]);



    