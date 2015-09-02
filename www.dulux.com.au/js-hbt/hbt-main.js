/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 

$(window).load(function(){
    var window_height = $(window).height();
    var window_width = $(window).width();
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
    //Making equally divided 3 columns
    var cell_margin = 20;
    var container_width = parseInt($("#hbt-three-column").width());
    var cell_width = (container_width - cell_margin*2)/3;
    $(".hbt-col-3").width(cell_width);
    $(".hbt-col-3").first().css("margin-right",(cell_margin-2)+"px");
    $(".hbt-col-3").last().css("float","right");
    
    //Stick menu
    var distance = $('#hbt-full-screen-area-floating-menu').offset().top,
    $window = $(window);

    $window.scroll(function() {
        if( $window.scrollTop() >= distance ) {
            // Your div has reached the top
            $('#hbt-full-screen-area-floating-menu').addClass("hbt-sticky-menu");
        }else{
            $('#hbt-full-screen-area-floating-menu').removeClass("hbt-sticky-menu");
        }
    });
    
});
