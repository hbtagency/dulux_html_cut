##Folder Structure: 
 -root
	-css-hbt/
	-img-hbt/
	-js-hbt/
	-font-hbt/
 index.html
 content.html
 contact.html

##HBT Code: 
 All our code is wrapped in 
     <!-- Code from HBT -->
        ...
     <!-- End of HTML from HBT -->
 Please ignore changes in other layout sections. 

##Cross Browser Test: 
 Done in IE 9(Carousel Animation Not Compatible),10,11;Safari;Chrome;Firefox; 
 
##Responsive Design: 
 This HTML version is responsive in 990px+ screen, which adapts to current live site. 

##Backend Friendliness: 
 1. Background URL in HTML, rather than CSS
 2. No special position for similar elements, which can be looped from program
    These include: content.html -> 2 column area; index.html -> carousel items;index.htm -> 3 column area.
 3. Carousel loop interval can be reset in index.html
       <script type="text/javascript">
             window.setInterval(function(){
             $('#hbt-carousel-rightButton').click();
             //Carousel interval
             }, 5000);
       </script>

##Note: 
 3 column area in home page is equally divided with same a margin in central 2 gaps. This effects is achieved in both CSS and JS. So it is not auto adapting when window resize(needs refreshing). 

##Author: 
 Nathan Zhang 
 nathan.z@hbtagency.com.au
 04 2562 5598


 