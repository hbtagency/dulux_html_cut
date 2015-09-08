/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 

$(window).load(function(){
    
    
    var window_height = parseFloat($(window).height());
    var window_width = parseFloat($(window).width());
    var right_offset = window_width*0.062;
    var min_right_offset = 120;
    if(window_width < 1250){
        if(right_offset < min_right_offset){
            right_offset = min_right_offset;
        }
    }
    if(window_width < 1100){
        min_right_offset = 150;
        if(right_offset < min_right_offset){
            right_offset = min_right_offset;
        }
    }
    var top_offset = ($("#header").height() + $("#nav").height()); 
    
    
    //Sit menu at container bottom or window bottom
    var full_screen_top = parseFloat($('#hbt-full-screen-area').offset().top);
    var full_screen_height = parseFloat($('#hbt-full-screen-area').height());

    if(window_height < (full_screen_top + full_screen_height)){
        if($(window).scrollTop() < ((full_screen_top + full_screen_height)-$('#hbt-full-screen-area-floating-menu').height())){
            if(((full_screen_top + full_screen_height) - $(window).scrollTop()) > $('#hbt-full-screen-area').height()){
                if(!$('#hbt-full-screen-area-floating-menu').hasClass('hbt-stick-to-window-bottom')){
                   $('#hbt-full-screen-area-floating-menu').addClass('hbt-stick-to-window-bottom');
                }
            }else{
                $('#hbt-full-screen-area-floating-menu').removeClass('hbt-stick-to-window-bottom'); 
            }
        }
    }else{
        if($('#hbt-full-screen-area-floating-menu').hasClass('hbt-stick-to-window-bottom')){
           $('#hbt-full-screen-area-floating-menu').removeClass('hbt-stick-to-window-bottom'); 
        }
    }
    
    //$("#hbt-full-screen-area-rightcolumn").height(window_height - top_offset);

    /*
    $("#hbt-full-screen-area").height(window_height - top_offset);
    $("#hbt-full-screen-area").css("background-position","-"+right_offset+"px");
    
    if(window_height - top_offset > 900){
        $(".hbt-full-screen-area-leftcolumn").css("padding-top","15%");
        $(".hbt-full-screen-area-rightcolumn").css("padding-top","15%");
    }
    if(window_height - top_offset > 1100){
        $(".hbt-full-screen-area-leftcolumn").css("padding-top","20%");
        $(".hbt-full-screen-area-rightcolumn").css("padding-top","20%");
    }*/
  
    //Stick menu only to bottom of either fullscreen container bottom or window bottom
    var distance = full_screen_top + full_screen_height - $('#hbt-full-screen-area-floating-menu').height();
    $window = $(window);

    $window.scroll(function() {
        if( $window.scrollTop() >= distance ) {
            // Your div has reached the top
            $('#hbt-full-screen-area-floating-menu').addClass("hbt-sticky-menu");
        }else{
            $('#hbt-full-screen-area-floating-menu').removeClass("hbt-sticky-menu");
        }
        
        if(window_height < (full_screen_top + full_screen_height-$window.scrollTop())){
            if(!$('#hbt-full-screen-area-floating-menu').hasClass('hbt-stick-to-window-bottom')){
                $('#hbt-full-screen-area-floating-menu').addClass('hbt-stick-to-window-bottom');
            }
        }else{
            if($('#hbt-full-screen-area-floating-menu').hasClass('hbt-stick-to-window-bottom')){
               $('#hbt-full-screen-area-floating-menu').removeClass('hbt-stick-to-window-bottom'); 
            }
        }
    });
    
});
