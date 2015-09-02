$(document).ready(function(){

	function printTrack() {
		$.get("/umbraco/myproject/print.ashx?SessionId=" + SessionId);
		print();
	};

	//Check if the P key has been pressed from a ctrl + p
	$("html").keypress(function (e) {
		  if ((e.which == 112) || (e.which == 80)) {
			 printTrack();
		  };
	 });
	
		//Check if the print button was clicked in top right
		$("img.print").click(function() {
			printTrack();					
		});

	
});	

