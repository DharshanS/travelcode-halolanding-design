$(document).ready(function(){


    $("#firstName").keyup(function(){
  
      validateFirstName();

})

$("#lastName").keyup(function(){
	reg_name1 = /^([a-zA-Z]{1,50})$/;
    lName = $("#lastName").val();

    if(lName !="" && reg_name1.test(lName)){
		$("#lastName-l").hide();
	}
	else{
		$("#lastName-l").text("Eenter our valid last name");
	}	

})
$("#email").keyup(function(){


})

$("#reEmail").keyup(function(){

	reg_name1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    remail = $("#reEmail").val();
	email = $("#email").val();
    if(remail !="" && reg_name1.test(remail)){
		$("#reEmail-l").hide();
	}
	else{
		$("#reEmail-l").text("Enter a valid email address");
	}

	
	if(email == remail){
		$("#reEmail-l").hide();
	}
	else{
		$("#reEmail-l").show();
	}

})	


$('.qte-submit').click(function(){
  validateFirstName();
  emailValidate();

})


function validateFirstName(){
  reg_name = /^([a-zA-Z]{1,50})$/;
    fName = $("#firstName").val();

  
    if(fName !="" && reg_name.test(fName)){
		$("#firstName-l").hide();
	}
	else{
    
		$("#firstName-l").text("name should be text");
	}	
}


function emailValidate(){
  reg_name1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  lName = $("#email").val();

  if(lName !="" && reg_name1.test(lName)){
  $("#email-l").hide();
}
else{
  $("#email-l").text('Enter your valid email address');
}	
}

var input = document.querySelector("#phone"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = [ "Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];



var iti = window.intlTelInput(input, {
    utilsScript: "https://moa-static-files.s3-us-west-2.amazonaws.com/css/utils.js"
  });
  var iti = intlTelInput(input, {
    initialCountry: "LK"
  });
  
  
  
  
  // on blur: validate
  input.addEventListener('blur', function() {
  
    // reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        var num = input.value.trim();
        document.getElementById("phoneNumber").value = num;
        document.getElementById("phoneNumber-l").innerHTML = "";
        documet.getElementById("phone").classList.remove("error-b");
      } else {
        
        document.getElementById("phoneNumber").value = "";
        document.getElementById("phoneNumber-l").innerHTML = "Enter valid mobile number";
        documet.getElementById("phone").classList.add("error-b");
      }
    }
  
  });
  input.addEventListener('change', reset);
  input.addEventListener('keyup', reset); 
  
  







})