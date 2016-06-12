
/* 
Service to handle query strings in pages
@Ed J. 2015
Last Update: 
*/

angular.module('vlographerApp').factory('Page', function() {
   var title = 'Vlographer';
   var description= 'Discover awesome Youtubers. Thousands of Youtube Channels.';
   var twitter={card:"", site:"", creator:"", title:"", description:"", image:""};
   var facebook={ url:"", type:"", title:"", image:"",description:"", site_name:"" };
   
   return {
     title: function() { return title; },
     setTitle: function(newVal) { title = newVal },
     //seo
     description: function() { return description; },
     setDescription: function(newVal) { description = newVal },
     //twitter
     twitter: function() {  
                               return twitter; },
     setTwitter: function(newVal) { twitter = newVal }, 
     //facebook
     facebook: function() { return facebook; },
     setFacebook: function(newVal) { facebook = newVal }
       
   };
});

