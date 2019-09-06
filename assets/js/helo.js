$(document).ready(function(){
//team@haloflights.co.uk 
var request={
  name:"",
  email:"",
  mobile:"",
  mode:"",
  date:"",
  price:"",
  callbackTime:"",
  specialRequest:"",
  noOfRooms:[],
  to:"sales@haloflights.co.uk"
}
var lastRoomsCount=1;
var roomList=[];

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

 
  var selected_year_month = $(".calMonthPriceSelected").attr("value");
            var year = parseInt(selected_year_month.split("-")[0], 10);
            var month = parseInt(selected_year_month.split("-")[1], 10);
            var depAirport = $('#dealDepAirport').val();
            var nights = $('#dealNoNights').val();
       

            for(let i=0;i<=roomList.length;i++){
             // alert('#noOfAdults_0'+(i+1));
             // alert($('#noOfAdults_0'+(i+1)).val())
              document.getElementById('#noOfAdults_0'+(i+1).value)
            }

if(  validateFirstName() &&  emailValidate())
{
request.date= selected_year_month;
request.mode=$('#com_mode').val();
request.specialRequest=$('#special_request').val();
request.callbackTime=$('#call_bak').val();
request.noOfRooms=roomList;
request.price=$('#priceSelected').val();
//request.price=$('#dateSelected').val();
request.mobile=$('#phone').val();


//alert(JSON.stringify(request));


 

//http://clickmybooking.com/tc-mailer/api/send/email


  $.ajax({
    type: "POST",
    url: "http://deals.haloflights.co.uk/api/send/email",
    contentType :  'application/json',
   dataType: 'JSON',

    data:JSON.stringify(request),
    
   
    success: function (data) {    
    // alert(data);   
        if(data==true){
         alert("Thank you we will be contacting you soon");
        }
        else{
          $("#res_p").append("An error occured");
        }     
        // $('.text-success').fadeIn(1000);
        // $('.text-success').fadeOut(500);
        // $("#contact-form")[0].reset();
        //$("#res_p").empty();
    }
});

}





})

$('#noOfRooms').change(function(){

 var currentRoomLength=$('.pax-array').length;
 var slectedRoomLength=$(this).val();

 if(currentRoomLength<slectedRoomLength)
 {
 var room={
  id:slectedRoomLength,
  adult:0,
  children:0,
  infant:0
}
roomList.push(room);
  $('#inner-rooms').html(createRoom(room));
}
  else
  {
    if(currentRoomLength!=1){
      roomList.splice(currentRoomLength-1,1);
      $(".pax-array")[currentRoomLength-1].remove();
    }
  
  }

});


//  $('.adults').change(function(){
    
//    alert($(this).val);
//  });

$(document).change('.adults',function(){
    
 

  //alert(JSON.stringify($event));
});

function validateFirstName(){
  reg_name = /^([a-zA-Z]{1,50})$/;
    fName = $("#firstName").val();

  
    if(fName !="" && reg_name.test(fName)){
    $("#firstName-l").hide();
    request.name=fName;
    return true;
	}
	else{
    
		$("#firstName-l").text("name should be text");
  }	
  return false;
}


function emailValidate(){
  reg_name1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  lName = $("#email").val();

  if(lName !="" && reg_name1.test(lName)){
  $("#email-l").hide();
  request.email=lName;
  return true;
}
else{
  $("#email-l").text('Enter your valid email address');
}	
}



function createRoom(room){
  var html="";
  for(let i=1;i<room.id;i++)
  {
   html=html+'<div class="row pax-array">'+
  '<div class="col-md-3  col-sm-6">'+
        '<div class="form-group">'+
          '<label >Room '+(i+1)+' </label>'+
        '</div>'+
  '</div>'+

  '<div class="col-md-3  col-sm-6">'+
    '<div class="form-group">'+
      '<label for="">ADULTS </label>'+
      '<select name="" id="noOfAdults_0'+i+'"  class="adults form-control"  onchange="myFunction()">'+
         ' <option value="">01</option>'+
          '<option value="">02</option>'+
          '<option value="">03</option>'+
          '<option value="">04</option>'+
        '</select>'+
    '</div>'+
  '</div>'+

  '<div class="col-md-3 col-sm-6">'+
    '<div class="form-group">'+
      '<label for="">CHILDREN</label>'+
      '<select name="" id="noOfChild" index="'+i+'" class="child form-control" >'+
          '<option value="">0</option>'+
          '<option value="">01</option>'+
          '<option value="">02</option>'+
          '<option value="">03</option>'+
        '</select>'+
    '</div>'+
  '</div>'+

  '<div class="col-md-3 col-sm-6">'+
    '<div class="form-group">'+
      '<label for="">INFANT'+
      '</label>'+
      '<select name="" id="noOfInfant" index="'+i+'" class=" infant form-control" >'+
          '<option value="">01</option>'+
          '<option value="">02</option>'+
          '<option value="">03</option>'+
          '<option value="">04</option>'+
        '</select>'+
    '</div>'+
  '</div>'+
'</div>';
  }


return html;


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
    initialCountry: "GB"
  });
  
  
  
  
  // on blur: validate
  input.addEventListener('blur', function() {
  
    // reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        var num = input.value.trim();
        document.getElementById("phoneNumber").value = num;
        request.mobile=num;
        document.getElementById("phoneNumber-l").innerHTML = "";
        document.getElementById("phone").classList.remove("error-b");
      } else {
        
        document.getElementById("phoneNumber").value = "";
        document.getElementById("phoneNumber-l").innerHTML = "Enter valid mobile number";
        document.getElementById("phone").classList.add("error-b");
      }
    }
  
  });
  input.addEventListener('change', reset);
  input.addEventListener('keyup', reset); 
  
  







})


