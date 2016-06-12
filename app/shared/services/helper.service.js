
/* 
Service to handle query strings in pages
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('HelperService', function HelperService () {
    
    var exports = {};
    
     //get array of dates starting from todays date, until X days from now
     exports.getDates = function (params) {
         //get dates for the next 30 days by default (optional parameter)
         if(typeof params['daysNo'] === 'undefined' || params['daysNo']=="null")
             params['daysNo']=30; 
           
         Date.prototype.addDays = function(days) {
               var dat = new Date(this.valueOf())
               dat.setDate(dat.getDate() + days);
               return dat;
         }

         function getDates(startDate, stopDate) {
              var dateArray = new Array();
              var currentDate = startDate;
              while (currentDate <= stopDate) {
                dateArray.push(currentDate)
                currentDate = currentDate.addDays(1);
              }
              return dateArray;
          }
         
         
         return getDates(new Date(), (new Date()).addDays(params['daysNo']));               
         
     };
    
    //Method to get all query string params as object
    exports.getDayName = function(dayNumber) {
        if(dayNumber !=null && dayNumber>=0 && dayNumber<7)
        {

            var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];           
            return day[dayNumber];
        }
        else
            return null;    
    };
    
    //Method to get all query string params as object
    exports.getMonthName = function(monthNumber) {
        if(monthNumber !=null && monthNumber>=0 && monthNumber<12)
        {
           
            var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            return month[monthNumber];
        }
        else
            return null;    
    };
    
    
     //Method to get all query string params as object
    exports.getShortMonthName = function(monthNumber) {
        if(monthNumber !=null && monthNumber>=0 && monthNumber<12)
        {
           
            var month  = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
            return month[monthNumber];
        }
        else
            return null;
        
    };
    
    //calculate period between two times in hours 
   exports.isDateBiggerThanToday = function(datetime){
       var rightnow = new Date();

       datetime=datetime.replace(/-/g, "/")
       var mydate=new Date(datetime);

       if(mydate > rightnow)
       {           
           return true;
       }  
       else
           return false;
    };

 //calculate period between two times in hours 
   exports.findDifferenceInHours = function(start_datetime, end_datetime){
       //convert datetime to time only
       start_datetime=start_datetime.replace(/-/g, "/")
       var start_time=new Date(start_datetime);

       end_datetime=end_datetime.replace(/-/g, "/")
       var end_time=new Date(end_datetime);

       //lets get the hours and minutes from our official date now
       var startTime=start_time.getHours() + ":" + (start_time.getMinutes()<10?'0':'') + start_time.getMinutes() + ":00";
       var EndTime=end_time.getHours() + ":" + (end_time.getMinutes()<10?'0':'') + end_time.getMinutes() + ":00";

       if(startTime && EndTime)
       {           
            var timeStart = new Date("01/01/2007 " + startTime).getHours();
            var timeEnd = new Date("01/01/2007 " + EndTime).getHours();

            return (timeEnd - timeStart) * 60; //period in minutes
       }  
       else
           return '';
    };
    
    //convert time string to short time string (exclude seconds)
    exports.convertDateTimeToShortDateTime = function(dateString, isShortMonthName){
       isShortMonthName = typeof isShortMonthName !== 'undefined' ?  isShortMonthName : false; //default paremeter

       dateString=dateString.replace(/-/g, "/")
       var mydate=new Date(dateString);
       //alert(mydate);
       if(mydate){           
           if(isShortMonthName==true) //get short month name
               return exports.getShortMonthName(mydate.getMonth()) +  ", " + mydate.getDate() ;          
           else
               return exports.getMonthName(mydate.getMonth()) +  ", " + mydate.getDate() ; 
       }            
       else
           return '';
    };

    
    //convert datetime string to short time string (exclude seconds)
    exports.convertDateTimeToShortTime = function(datetime){
       datetime=datetime.replace(/-/g, "/")
       var mydate=new Date(datetime);

       var res= mydate.getHours() + ":" + (mydate.getMinutes()<10?'0':'') + mydate.getMinutes();
       return res;
    };
    
      //convert time string to short time string (exclude seconds)
   exports.convertDateToShortDate = function(dateString, isShortMonthName){
       isShortMonthName = typeof isShortMonthName !== 'undefined' ?  isShortMonthName : false; //default paremeter
       
       dateString=dateString.replace(/-/g, "/")
       var mydate=new Date(dateString);
       //alert(mydate);
       if(mydate){           
           if(isShortMonthName==true) //get short month name
                return exports.getShortMonthName(mydate.getMonth()) +  ", " + mydate.getDate() ;          
           else
               return exports.getMonthName(mydate.getMonth()) +  ", " + mydate.getDate() ; 
       }            
       else
           return '';
   };
      
    
    return exports;
});


