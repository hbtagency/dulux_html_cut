//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//6.0 Paint Calculator 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	//Check which version of the calculator is being used.
	var interior = calcType == "interior";
	var exterior = calcType == "exterior";
	//Transfer values through query string from paint-calc to interior/exterior pages
	var roomSize = $.query.get('roomSize');
	var houseSize = $.query.get('houseSize');
	//Error messages
	var msgOutOfRange = "Please enter a value from $low$ to $hi$."; // $low$ and $hi$ are replace by the proper values during validation
	var msgNotPositiveNumber = "Please enter a positive number";
	var msgNotPositiveWholeNumber = "Please enter positive whole numbers only";
	
	//////////////////////////////////////////////////////
	//Check if using Dulux Once, if so hide coat selection
	/////////////////////////////////////////////////////
	/*$('.checkbox #dul-once').change(function(){
	
		if ($('.checkbox #dul-once').is(':checked')) {

			//Hide if Dulux one Coat is selected
			$('#coat-selector').fadeOut(350);	

		} else {
			
			//Show if it's not selected 
			$('#coat-selector').fadeIn(350);	

		};
	
	});*/
	//End change function
	
	var setFormValues;
	if (interior) {
		//////////////////////////////////////////////////////
		//Change field values based on room size selection
		//////////////////////////////////////////////////////
		$('#room-size').val(roomSize == false ? "c" : roomSize);
		$('#room-size').change(function(){
			if ($("#room-size option[value=" + $("#room-size").val() + "]").hasClass("link")) {
				document.location = $("#room-size").val();
			} else {
				setFormValues($("#room-size").val());
			}
		});
		
		setFormValues = function(val) {
			if(val == "s") {
				$roomLength = 3;
				$roomWidth = 3;
				$rommHeight = 2.4;
				$numDoors = 1;
				$numWindows = 1;
			} else if(val == "m") {
				$roomLength = 4;
				$roomWidth = 3;
				$rommHeight = 2.4;
				$numDoors = 2;
				$numWindows = 1;
			} else if(val == "l") {
				$roomLength = 5;
				$roomWidth = 4;
				$rommHeight = 2.4;
				$numDoors = 2;
				$numWindows = 2;
			} else {
				$roomLength = "";
				$roomWidth = "";
				$rommHeight = "";
				$numDoors = "";
				$numWindows = "";
			};
			
			//Print Values
			$('#rm-len').val($roomLength);
			$('#rm-wid').val($roomWidth);
			$('#rm-hei').val($rommHeight);
			$('#nm-dor').val($numDoors);
			$('#nm-win').val($numWindows);
		
		}//End Change Function
		setFormValues(roomSize);
	} else if (exterior) {
		//////////////////////////////////////////////////////
		//Change field values based on huse size selection
		//////////////////////////////////////////////////////
		$('#house-size').val(houseSize == false ? "c" : houseSize);
		$('#house-size').change(function(){
			if ($("#house-size option[value=" + $("#house-size").val() + "]").hasClass("link")) {
				document.location = $("#house-size").val();
			} else {
				setFormValues($("#house-size").val());
			}
		});
		
		setFormValues = function(val) {
			if (val == "s") {
				$squareMeters = 125;
				$numDoors = 3;
				$numWindows = 6;
			} else if (val == "m") {
				$squareMeters = 210;
				$numDoors = 3;
				$numWindows = 9;
			} else if (val == "l") {
				$squareMeters = 420;
				$numDoors = 4;
				$numWindows = 11;
			} else {
				$squareMeters = "";
				$numDoors = "";
				$numWindows = "";
			}
			
			//Print Values
			$('#hs-sqm').val($squareMeters);
			$('#nm-dor').val($numDoors);
			$('#nm-win').val($numWindows);
		}
		setFormValues(houseSize);
	}
	
	//////////////////////////////////////////////////////
	//Field validation functions
	//////////////////////////////////////////////////////
	function validateField(field, validationFn, errorText) {
		if (!validationFn(field.val())) {
			showError(field, errorText);
			passValidation = false;
		}
	}
	function validateLimits(field, low, hi) {
		if (field.val() < low || field.val() > hi) {
			var msg = msgOutOfRange.replace("$low$", low);
			msg = msg.replace("$hi$", hi);
			showError(field, msg)
			passValidation = false;
		}
	}
	function showError(field, message) {
		var errorDiv = $(field.parent().find('div.error'));
		errorDiv.text(message);
		errorDiv.fadeIn(350);
	}
		
	//check that doors & windows are whole numbers
	var isWhole_re       = /^\s*\d+\s*$/;
	function isWhole (s) {
	   return String(s).search (isWhole_re) != -1
	}
	function isWholePositive(s) {
		return isWhole(s) && s >= 0;
	}
	function isNumPositive(s) {
		if (!isNaN(s) && s.length != 0) {
			return s >= 0;
		} else {
			return false;
		}
	}
	var passValidation;

	//////////////////////////////////////////////////////
	//Calculations
	//////////////////////////////////////////////////////
	if (interior) {
		$('input.calculate').click(interiorClickListener);
	} else if (exterior) {
		$('input.calculate').click(exteriorClickListener);
	}
	function interiorClickListener() {
		
		////////////////////////////////////////////////////////////
		//Validation
		////////////////////////////////////////////////////////////
		$('div.error').fadeOut(0);
		passValidation = true;
		
		validateLimits($('#paint-interior #nm-dor'), 1, 6);
		validateLimits($('#paint-interior #nm-win'), 0, 10);
		validateLimits($('#paint-interior #rm-len'), 1, 10);
		validateLimits($('#paint-interior #rm-wid'), 1, 15);
		validateLimits($('#paint-interior #rm-hei'), 1, 6);
		
		validateField($('#paint-interior #nm-dor'), isWholePositive, msgNotPositiveWholeNumber);
		validateField($('#paint-interior #nm-win'), isWholePositive, msgNotPositiveWholeNumber);
		validateField($('#paint-interior #rm-len'), isNumPositive, msgNotPositiveNumber);
		validateField($('#paint-interior #rm-wid'), isNumPositive, msgNotPositiveNumber);
		validateField($('#paint-interior #rm-hei'), isNumPositive, msgNotPositiveNumber);
		
		if (!passValidation) return;
			
	
		//Declerations Interior
		$roomLength = parseFloat($('#paint-interior #rm-len').val());
		$roomWidth = parseFloat($('#paint-interior #rm-wid').val());
		$roomHeight = parseFloat($('#paint-interior #rm-hei').val());
		$numDoors = parseFloat($('#paint-interior #nm-dor').val());
		$numWindows = parseFloat($('#paint-interior #nm-win').val());
		
		$doorsM2 = 1.72;
		$windowsM2 = 3.57;
	
		if ($('.radio #new').is(':checked')) {
			$newORrepaint = 1;
		} else {
			$newORrepaint = 0;		
		};
		
		
		$dorwinTrim = (((((2 * ($roomWidth * $roomHeight)) + (2 * ($roomLength * $roomHeight))) - ($numDoors * $doorsM2 + $numWindows * $windowsM2)) / 16) * (2 + $newORrepaint) * 0.1);
		
			//Check if Dulux Once checkbox is checked
		if ($('.checkbox #dul-once').is(':checked')) {
			
			//Calculate using 1 coat system (Dulux Once)
		$litresRequired = ((((2 * ($roomWidth * $roomHeight)) + (2 * ($roomLength * $roomHeight))) - ($numDoors * $doorsM2 + $numWindows * $windowsM2)) / 12) + ((((((2 * ($roomWidth * $roomHeight))+(2 *($roomLength * $roomHeight))) - ($numDoors * $doorsM2 + $numWindows * $windowsM2)) / 16) * $newORrepaint) + $dorwinTrim);
			
		} else {
		
			//Calculate using 2 coat system
		$litresRequired = (((((2 * ($roomWidth * $roomHeight)) + (2 * ($roomLength * $roomHeight))) - ($numDoors * $doorsM2 + $numWindows * $windowsM2)) / 16) * (2 + $newORrepaint) + $dorwinTrim);
		
		};
		
		//round up to next whole number
		$litresRequired = Math.ceil(Math.max(0, $litresRequired))
		
		
		//Print total in output DIV if total isn't NAN
		if ( isWhole($litresRequired) ) {
			//Print total in output DIV
			$('#paint-result p.result').text($litresRequired);
			$("#paint-result").attr("data","[ItemType=7][ItemValue="+$litresRequired+"]");
			$("#paint-result").addClass("addable");
			activateAddables();
			$("input.calculate").removeClass("calculate").addClass("recalculate")
		} else {
			alert("invalid result: " + $litresRequired);
		};
		
		
		return false
	
	};
	function exteriorClickListener() {
		
		////////////////////////////////////////////////////////////
		//Validation
		////////////////////////////////////////////////////////////
		$('div.error').fadeOut(0);
		passValidation = true;
		
		validateLimits($('#paint-exterior #hs-sqm'), 20, 1000);
		validateLimits($('#paint-exterior #nm-dor'), 1, 10);
		validateLimits($('#paint-exterior #nm-win'), 1, 20);
		
		validateField($('#paint-exterior #hs-sqm'), isNumPositive, msgNotPositiveNumber);
		validateField($('#paint-exterior #nm-dor'), isWholePositive, msgNotPositiveWholeNumber);
		validateField($('#paint-exterior #nm-win'), isWholePositive, msgNotPositiveWholeNumber);
		
		if (!passValidation) return;
			
	
		//Declerations Interior
		$numDoors = B9 = parseFloat($('#paint-exterior #nm-dor').val());
		$numWindows = B10 = parseFloat($('#paint-exterior #nm-win').val());
		$squareMeters = B8 = parseFloat($('#paint-exterior #hs-sqm').val());
		
		$doorsM2 = B1 = 1.72;
		$windowsM2 = B2 = 3.57;
		$garageM2 = B3 = 6.24;
		
		
		if ($('.radio #new').is(':checked')) {
			$newORrepaint = 1;
		} else {
			$newORrepaint = 0;		
		};
		
		var H1 = $newORrepaint;
		
		var garageVal = $('#paint-exterior #garageSelect').val();
		var garageM2;
		if (garageVal == 1) {
			garageM2 = (((6*2.8)*2)+(3*2.8)*2)-(B1+B2+B3);
		} else if (garageVal == 2) {
			garageM2 = (((6*2.8)*2)+(6*2.8)*2)-(B1+B2+B3);
		} else if (garageVal == 3) {
			garageM2 = (((6*2.8)*2)+(9*2.8)*2)-(B1+B2+B3);
		} else {
			garageM2 = 0;
		}
		
		var E8 = F8 = garageM2;
		var F9 = (((Math.sqrt(B8)*2.8)*4))-((B9*B1)+(B10*B2));
		var F12 = (((E8*(2+H1))+(E9*(2+H1)))/16)*0.1;
		var E9 = (((Math.sqrt(B8)*2.8)*4))-((B9*B1)+(B10*B2));
		var E12 = (((E8*(2+H1))+(E9*(2+H1)))/16)*0.1;
		
		//Check if Dulux Once checkbox is checked
		if ($('.checkbox #dul-once').is(':checked')) {
			var totalLitres = ((((E8*(1))+(E9*(1)))/12)+(E12))+(((((E8*(1))+(E9*(1)))/16)*H1));
		} else {
			var totalLitres = (((E8*(2+H1))+(E9*(2+H1)))/16)+E12;
		};
		
		$litresRequired = Math.ceil(Math.max(0, totalLitres))
		
		
		//Print total in output DIV if total isn't NAN
		if ( isWhole($litresRequired) ) {
			//Print total in output DIV
			$('#paint-result p.result').text($litresRequired);
			$("#paint-result").attr("data","[ItemType=7][ItemValue="+$litresRequired+"]");
			$("#paint-result").addClass("addable");
			activateAddables();
			$("input.calculate").removeClass("calculate").addClass("recalculate")
		} else {
			alert("invalid result: " + $litresRequired);
		};
		
		return false
	
	};
	//End Calculations function

});//End first document Ready