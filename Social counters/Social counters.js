(function($) {
  $.fn.SocialCounter = function(options) {
    var settings = $.extend({
      // These are the defaults.
      facebook_user:'',
      facebook_token:'',
      instagram_user:'',
      instagram_token:''
    }, options);

    function facebook(){
      //Facebook API
      //60 Day Access Token - Regenerate a new one after two months
      //https://neosmart-stream.de/facebook/how-to-create-a-facebook-access-token/
      //https://smashballoon.com/custom-facebook-feed/access-token/
      $.ajax({
        url: 'https://graph.facebook.com/v2.8/'+settings.facebook_user,
        dataType: 'json',
        type: 'GET',
        data: {
          access_token:settings.facebook_token,
          fields:'fan_count'
        },
        success: function(data) {   
          var followers = parseInt(data.fan_count);
          var k = kFormatter(followers);
          $('#socialcounter .social_item.social_facebook .count').append(k); 
          $('#socialcounter .social_item.social_facebook').attr('href','https://facebook.com/'+settings.facebook_user);
          getTotal(followers); 
        } 
      }); 
    }
    function instagram(){
      $.ajax({
        url: 'https://api.instagram.com/v1/users/self/',
        dataType: 'jsonp',
        type: 'GET',
        data: {
          access_token: settings.instagram_token
        },
        success: function(data) {
          var followers = parseInt(data.data.counts.followed_by);
          var k = kFormatter(followers);
          $('#socialcounter .social_item.social_instagram .count').append(k);
          $('#socialcounter .social_item.social_instagram').attr('href','https://instagram.com/'+settings.instagram_user);
          getTotal(followers); 
        }
      });
    }
    //Function to add commas to the thousandths
    $.fn.digits = function(){ 
      return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
      })
    }
    //Function to add K to thousands
    function kFormatter(num) {
      return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
    }
    //Function to add K to thousands
    function mFormatter(num) {
      return num > 999999 ? (num/1000000).toFixed(1) + 'm' : num;
    }

    function linkClick(){
      $('#socialcounter .social_item').attr('target','_blank');
    }
    linkClick();

    //Call Functions
    if (settings.facebook_user!='' && settings.facebook_token!=''){ 
      facebook(); 
    } if(settings.instagram_user!='' && settings.instagram_token!=''){ 
      instagram();
    }
  };
}(jQuery));
