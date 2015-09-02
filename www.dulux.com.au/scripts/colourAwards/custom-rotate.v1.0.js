var isHTML5Video = (typeof(document.createElement('video').canPlayType) != 'undefined') ? true : false;
		$( document ).ready(function() {
			//initialise();
						
			$('img.animationMain').flipbook({
				'end': 373,
				'loop': true,
				'fps': 16,
				'mobileStep': 1,
				'images': '/imgs/colour-awards-2014/JPEG/FRE0001_Dulux_%5d.jpg'
			});
			
		});
		
		function startAnimation()
		{
			setInterval(function(){
				startRotation();
			},50);
		}
		
		var counter = 11;
		
		function initialise()
		{
			for(var i=2; i<50; i++)
			{
				var counterStr = i + "";
				if(counterStr.length == 1)
					counterStr = "0000" + counterStr; 
				else if(counterStr.length == 2)
					counterStr = "000" + counterStr;
				else if(counterStr.length == 3)
					counterStr = "00" + counterStr;
				var imageNameStart = "/imgs/colour-awards-2014/JPEG/FRE0001_Dulux_" +counterStr+ ".jpg";
				
				$("#animationHolder").append("<div id=\"htmlAnimation-" + i + "\" class=\"animation hidden\"><img src=\"" +  imageNameStart + "\"></div>")
				//$("#htmlAnimation-" + i ).css("background-image", imageNameStart); 
			}
		}
		
		
		
		
				
		// function startRotation() {
			
			// if(counter == 374)
				// counter = 0;
			
			// $(".animation").addClass("hidden");
			
			// $("#htmlAnimation-" + counter ).removeClass("hidden");
			
			// counter++;
		// }