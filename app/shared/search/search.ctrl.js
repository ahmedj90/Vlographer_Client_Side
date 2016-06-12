 

angular.module('vlographerApp')
  .controller('searchCtrl',['$scope', function($scope){    
       
      
    //**************************************************  JQUERY STUFF *******************************************************/
      
    //This is jquery Ready event equivelent
    angular.element(document).ready(function () {
        
        // Instantiate the Bloodhound suggestion engine
        var youtubers = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            
            remote: {
                url: 'http://localhost/vlographer/public/channels/filter/names?searchString=%QUERY',
                wildcard: '%QUERY',
                filter: function (response) {
                    // Map the remote source JSON array to a JavaScript object array
                    return $.map(response, function (item) {
                        return {
                            value: item
                        };
                    });
                }
            }
        });

         // Instantiate the Bloodhound suggestion engine
        var topics = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            
            remote: {
                url: 'http://localhost/vlographer/public/channels/filter/topics?searchString=%QUERY',
                wildcard: '%QUERY',
                filter: function (response) {
                    // Map the remote source JSON array to a JavaScript object array
                    return $.map(response, function (item) {
                        return {
                            
                            value: item
                        };
                    });
                }
            }
        });
        
        // Initialize the Bloodhound suggestion engine
        youtubers.initialize();
        topics.initialize();
        
     
        // Set up Typeahead
        $('.typeahead').typeahead({
           highlight: true,
            hint: true,
            matcher: function(item) {
               return true;
            }
        },
       
        {
           name: 'Youtubers',         
             
           displayKey: 'value.name',
           source: youtubers.ttAdapter(),
           templates: {
               suggestion: function (data) {
                    var categories_str="";
                    var cat_co=0;
                    if (data.value.categories!=null && JSON.parse(data.value.categories) !='')
                        JSON.parse(data.value.categories).forEach(function(category) {
                            if(cat_co>1)
                                return;
                            if(cat_co==1)
                                categories_str+=", ";
                            categories_str +=category.tag;                        
                            cat_co++;
                        });
                   
                    return '<div class="search-item"><a class="search-link" href="'+data.value.CHID + '/' + data.value.name.replace(/ /g,"_") +'">' +
                        '<div><img src="' + data.value.img_link + '" width="22px" height="22px" style="border-radius:3px"/>' +
                        '<span class="search-item-text">' + data.value.name.substring(0, 24) + '</span>'+
                        '<span class="search-item-categories">'+ categories_str +'</span>' +
                    '</div></a></div><div style="clear:both"></div>';
               },
               header: '<span class="search-header">Youtubers</span>',
           }           
        },
        {
           name: 'topics',
            
           displayKey: 'value.topic',
           source: topics.ttAdapter(),
           templates: {
               suggestion: function (data) {
                    return '<div class="search-item"><a href="search/' + data.value.ID + '/'+data.value.topic.replace(/ /g,"_") +'"><div><span class="glyphicons tag"> <i class="topic-icon-search" ></i> <span class="search-topic-text"> #'+  data.value.topic +'  </span> </span></div></a></div>';
               },
               header: '<hr style="width:100%;padding:0px;margin:0px;margin-top:5px" />'+
                        '<span class="search-header">Topics</span>',               
           }      
        });
        
        
        
        //set the device type variable on load
        checkDeviceType();      
        
        function checkDeviceType()
        {          
            //alert($('div.detect-device-class').text());
            if($('div.detect-device-class').text()=="mobile") //mobile
                $scope.isMobile= true;
            else    //desktop
                $scope.isMobile= false;
        }
     
        
        
            
    }); //end ready event
      
      
      
  }]); //end controller

