/* 
 * Autho Nathan Zhang
 * nathan.z@hbtagency.com.au 
 */
$(window).load(function(){
    //Step 1 Init params and put current image always in the middle.
    var carousel_height = parseFloat($(".hbt-carousel-item").first().height());
    var carousel_item_width = parseFloat($("#hbt-carousel-inner").children().first().width());
    var carousel_container_width = $("#hbt-carousel-outter").width();
    //This value will put current div in center.
    var left_offset = parseFloat(carousel_container_width/2) - parseFloat(carousel_item_width/2);
    var move_left_div = carousel_item_width - left_offset;
    
    $(".hbt-carousel-mask").width(left_offset);    
    //Make it initially like 4,1,2,3,4,1
    $("#hbt-carousel-inner").children(':last').clone().prependTo($("#hbt-carousel-inner"));
    $("#hbt-carousel-inner").children(':first').next().clone().appendTo($("#hbt-carousel-inner"));

    $("#hbt-carousel-inner").first().css("margin-left", "-"+parseFloat(move_left_div)+"px");
    $(".hbt-carousel-item-capcontainer").height(carousel_height - 2.5);
    
    //Step 2 click events
    $("#hbt-carousel-rightButton").click(function(){
        initAnimationAndBlockClickEvents($("#hbt-carousel-inner"));
        var distance = $("#hbt-carousel-inner").css("transform");
        if(distance === "none"){
            distance = -carousel_item_width;
        }else{
            distance = parseFloat(distance.split(",")[4]) - carousel_item_width;
        }
        var inner_container_right_point = parseFloat($("#hbt-carousel-inner").children(':last').offset().left);
        var outter_container_right_point = parseFloat($("#hbt-carousel-outter").offset().left);      
        
        if((inner_container_right_point - outter_container_right_point) < 2*carousel_item_width)
        {
            distance = 0;
            moveCarousel(distance);
        }else{
            moveCarousel(distance);
        }
    });
    
    $("#hbt-carousel-leftButton").click(function(){
        initAnimationAndBlockClickEvents($("#hbt-carousel-inner"));
        //move one cell
        var distance = $("#hbt-carousel-inner").css("transform");
        if(distance === "none"){
            distance = carousel_item_width;
        }else{
            distance = parseFloat(distance.split(",")[4]) + carousel_item_width;
        }
        var inner_container_left_point = parseFloat($("#hbt-carousel-inner").offset().left);
        var outter_container_left_point = parseFloat($("#hbt-carousel-outter").offset().left);
        if((outter_container_left_point - inner_container_left_point) < carousel_item_width)
        {
            distance = -(parseFloat($("#hbt-carousel-inner").children().length) - 3)*carousel_item_width;
            moveCarousel(distance);
        }else{
            moveCarousel(distance);
        }
    });
    
    window.setInterval(function(){
        if(!$("body").hasClass('freeze')){
            $('#hbt-carousel-rightButton').click();
        }
    //Carousel interval
    }, 5000);
    
    //This listener is to block click events happens during transition.
    $("#hbt-carousel-inner").on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
        $("#hbt-carousel-inner").removeClass('hbt-carousel-transition');
        $("body").removeClass('freeze')
    });
        
});

function initAnimationAndBlockClickEvents(container){
    container.addClass('hbt-carousel-transition');
    $("body").addClass('freeze');
}

function moveCarousel(d){
    if(d > 0){
            $("#hbt-carousel-inner").css("transform", "translate("+d+"px)");
    }else{
            $("#hbt-carousel-inner").css("transform", "translate(-"+(-d)+"px)");
    }
}


