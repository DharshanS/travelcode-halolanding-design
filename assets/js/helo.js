$(document).ready(function() {
  //team@haloflights.co.uk
  var request = {
    name: "",
    email: "",
    mobile: "",
    mode: "",
    date: "",
    price: "",
    airPort: "",
    callbackTime: "",
    specialRequest: "",
    noOfRooms: [],
    to: "team@haloflights.co.uk"
  };

  const datsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var roomsList = [];

  var room = {
    id: 0,
    adult: 1,
    child: 0,
    infant: 0
  };

  roomsList.push(room);

  $("#roomsList").val(JSON.stringify(roomsList));

  var lastRoomsCount = 1;

  $("#firstName").keyup(function() {
    validateFirstName();
  });

  $("#lastName").keyup(function() {
    reg_name1 = /^([a-zA-Z]{1,50})$/;
    lName = $("#lastName").val();

    if (lName != "" && reg_name1.test(lName)) {
      $("#lastName-l").hide();
    } else {
      $("#lastName-l").text("Eenter our valid last name");
    }
  });
  $("#email").keyup(function() {});

  $("#reEmail").keyup(function() {
    reg_name1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    remail = $("#reEmail").val();
    email = $("#email").val();
    if (remail != "" && reg_name1.test(remail)) {
      $("#reEmail-l").hide();
    } else {
      $("#reEmail-l").text("Enter a valid email address");
    }

    if (email == remail) {
      $("#reEmail-l").hide();
    } else {
      $("#reEmail-l").show();
    }
  });


  $("#clearSendEmailInquiry").click(function() {
    $("#in-firstName").val("");
    $("#in-firstName-l").text("");
    $("#in-email").val("");
    $("#in-email-l").text("");
    $("#in-phone").val("");
    $("#in-phoneNumber-l").text("");
    $("#in-date").val("");
    $("#in-depature-date").text("");
  });
$("#clearCalendarSendEmailInquiry").click(function(){
  $("#firstName").val("");
  $("#email").val("");
  $("#phone").val("");
  $("#firstName-l").text("");
  $("#phone-l").text("");
  $("#email-l").text("");

})
   $("#clearRequestCallBackForm").click(function() {
    $("#cal-firstName").val("");
    $("#cal-firstName-l").text("");
    $("#cal-email").val("");
    $("#cal-email-l").text("");
    $("#cal-phone").val("");
    $("#cal-phone-l").text("");
    $("#cal-date").val("");
    $("#cal-date-l").text("");
  });

  $("#sendEmailInquiry").click(function() {
    
    let isFormValid = true;
    let name_pattern = /^([a-z A-Z]{1,50})$/;
    let email_pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!name_pattern.test($("#in-firstName").val())){
      $("#in-firstName-l").text("Please enter valid name");
      isFromValid = false;
    }else{
      $("#in-firstName-l").text("");
    }
    if(!email_pattern.test($("#in-email").val())){
      $("#in-email-l").text("Please enter valid email address");
      isFromValid = false;
    }else{
      $("#in-email-l").text("");
    }
    var phone = $("#in-phone").val();
 
    if(phone == "" || !(phone.match(/\d/g).length===10)){
      $("#in-phoneNumber-l").text("Please enter valid phone number");
      isFromValid = false;
    }else{
      $("#in-phoneNumber-l").text("");
    }
    var depatureDate = $("#in-date").val();
    if(depatureDate == ""){
      $("#in-depature-date").text("Please select depature date");
      isFromValid = false;
    }else{
      $("#in-depature-date").text("");
    }
   
 
   

    if(isFromValid){
      //call sendEmail

      var date=$('#in-date').val().split("/");
    
     
      request.name=$("#in-firstName").val();
      request.email=$("#in-email").val();
      request.mobile=$("#in-phone").val();
     
      (request.date = {
        year: date[2],
        month: datsList[parseInt(date[0])],
        day: date[1]
      }),
      
      request.airPort =$("#in-airport").val();
      request.nights = $("#in-nights").val();
      request.noOfRooms = JSON.parse($("#roomsList").val());
      request.specialRequest = $("#in-specialReq").val();
      request.callbackTime = $("#in-callback").val();
      console.log(request);
      sendMail(request);
    }

  });

  $(".qte-submit").click(function() {
    var selected_year_month = $(".calMonthPriceSelected").attr("value");
    var year = parseInt(selected_year_month.split("-")[0], 10);
    var month = parseInt(selected_year_month.split("-")[1], 10);
   // alert(month);
    var depAirport = $("#dealDepAirport").val();
    var nights = $("#dealNoNights").val();

    var isFormValid = true;
    let name_pattern = /^([a-z A-Z]{1,50})$/;
    let email_pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!name_pattern.test($("#firstName").val())){
      $("#firstName-l").text("Please enter valid name");
      isFromValid = false;
    }
    else{
      $("#firstName-l").text("");
    }
    if(!email_pattern.test($("#email").val())){
      $("#email-l").text("Please enter valid email address");
      isFromValid = false;
    }
    else{
       $("#email-l").text("");
    }
    var phone = $("#phone").val();
 
    if(phone == "" || !(phone.match(/\d/g).length===10)){
      $("#phone-l").text("Please enter valid phone number");
      isFromValid = false;
    }
    else{
      $("#phone-l").text(" ");
    }

    if (isFromValid) {
      (request.date = {
        year: year,
        month: datsList[month-1],
        day: $("#dateSelected").val()
      }),
        (request.mode = $("#com_mode").val());
      request.specialRequest = $("#special_request").val();
      request.callbackTime = $("#call_bak").val();
      request.noOfRooms = JSON.parse($("#roomsList").val());
      request.airPort = depAirport;
      request.nights = nights;
      request.price = $("#priceSelected").val();
      request.mobile = $("#phone").val();

      console.log(request);

      sendMail(request);

      //http://clickmybooking.com/tc-mailer/api/send/email
    }
  });

;

  $(".cal-submit").click(function() {
    var isFormValid = true;
    let name_pattern = /^([a-z A-Z]{1,50})$/;
    let email_pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!name_pattern.test($("#cal-firstName").val())){
      $("#cal-firstName-l").text("Please enter valid name");
      isFormValid = false;
    }else{
      $("#cal-firstName-l").text("");
    }
    if(!email_pattern.test($("#cal-email").val())){
      $("#cal-email-l").text("Please enter valid email address");
      isFormValid = false;
    }else{
      $("#cal-email-l").text("");
    }
    let phone = $("#cal-phone").val();
 
    if(phone == "" || !(phone.match(/\d/g).length===10)){
      $("#cal-phone-l").text("Please enter valid phone");
      isFormValid = false;
    }else{
      $("#cal-phone-l").text("");
    }
    let depatureDate = $("#cal-date").val();
    if(depatureDate == ""){
      $("#cal-date-l").text("Please select depature date");
      isFormValid = false;
    }else{
      $("#cal-date-l").text("");
    }

    if(isFormValid){
      requestCallBack();
    }

  });

  $(".noOfRooms").change(function() {
    var currentRoomLength = $(".pax-array").length;
    var slectedRoomLength = $(this).val();

    console.log("pax-array :" +currentRoomLength);
    console.log("slectedRoomLength :"+ slectedRoomLength)
 

    if (currentRoomLength <slectedRoomLength) {
      var room = {
        id: slectedRoomLength,
        adult: 1,
        child: 0,
        infant: 0
      };
      // roomsList.push(room);
      $(".inner-rooms").html(createRoom(room));
    } else {
     
     var paxArray= $(".pax-array");
     
     for(i=0;i<paxArray.length;i++){
    
      if(slectedRoomLength<=i){
       
       // alert($(".pax-array")[1
       roomsList.splice(i,1);
        $(".pax-array")[i-1].remove();
      }
     }
     
    }
   // alert(JSON.stringify(roomsList));
  });


  $(".noOfRoomsEmail").change(function(){

    var currentRoomLength = $(".pax-array-email").length;
    var slectedRoomLength = $(this).val();

    if (currentRoomLength <slectedRoomLength) {
      var room = {
        id: slectedRoomLength,
        adult: 1,
        child: 0,
        infant: 0
      };
      // roomsList.push(room);
      $(".inner-rooms-email").html(createRoomEmail(room));
    } else {
     
     var paxArray= $(".pax-array-email");
     
     for(i=0;i<=paxArray.length;i++){
    
      console.log("pax-array-email:" +i);
      console.log("paxArray :"+ paxArray.length)
      console.log("slectedRoomLength :"+ slectedRoomLength)

      if(slectedRoomLength<=i){
       
        console.log("inside :"+ slectedRoomLength);

       roomsList.splice(i,1);
        $(".pax-array-email")[i-1].remove();
      }
     }
     
    }

  })

  function sendMail(request) {
    $.ajax({
      type: "POST",
      url: "http://deals.haloflights.co.uk/api/send/email",
      contentType: "application/json",
      dataType: "JSON",

      data: JSON.stringify(request),

      success: function(data) {
        if (data == true) {
          alert("Thank You for Inquiring with Halo Flights UK.");
        } else {
          $("#res_p").append("An error occured");
        }
      }
    });
  }

  $(document).change(".adults", function() {
    //alert(JSON.stringify($event));
  });

  function validateFirstName() {
    reg_name = /^([a-zA-Z]{1,50})$/;
    fName = $("#firstName").val();

    if (fName != "" && reg_name.test(fName)) {
      $("#firstName-l").hide();
      request.name = fName;
      return true;
    } else {
      $("#firstName-l").text("name should be text");
    }
    return false;
  }

  function emailValidate() {
    reg_name1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    lName = $("#email").val();

    if (lName != "" && reg_name1.test(lName)) {
      $("#email-l").hide();
      request.email = lName;
      return true;
    } else {
      $("#email-l").text("Enter your valid email address");
    }
  }

  function inqueryNow() {
    var request = {
      firstName: $("#in-firstName").val(),
      email: $("#in-email").val(),
      mobile: $("#in-phone").val(),
      mode: $("#in-mode").val(),
      callbackTime: $("#in-callback").val(),
      date: $("#in-date").val(),
      airPort: $("#in-airport").val(),
      nights: $("#in-nights").val(),
      specialRequest: "#in-specialReq",
      noOfRooms: []
    };
   // sendMail(request);
    //alert(JSON.stringify(request));
  }

   function requestCallBack() {
    var date=$('#cal-date').val().split("/");
    let request = {
      name: $("#cal-firstName").val(),
      email: $("#cal-email").val(),
      mobile: $("#cal-phone").val(),
      mode: 'A Call Back',
      callbackTime: $("#cal-time").val(),
      date : {
        year: date[2],
        month: datsList[parseInt(date[0])],
        day: date[1]
      },
      airPort: $("#call-airport").val(),
      price: 0,
      nights: $("#cal-nights").val(),
      specialRequest: '',
      to: "Sale@haloflights.co.uk",
      noOfRooms: []
    };
    sendMail(request);
  }

  function callInqueryNow() {
    var request = {
      firstName: $("#cal-firstName").val(),
      email: $("#cal-email").val(),
      mobile: $("#cal-phone").val(),
      mode: $("#cal-mode").val(),
      callbackTime: $("#cal-callback").val(),
      date: $("#cal-date").val(),
      airPort: $("#call-airport").val(),
      nights: $("#call-nights").val(),
      specialRequest: "#call-specialReq",
      noOfRooms: []
    };
    sendMail(request);
  }



  function createRoomEmail(room) {
    var html = "";
    var roomsCount = room.id;
    
    for (i = 1; i < roomsCount; i++) {
      var roomNo = i ;

      html =
        html +
        '<div class="row pax-array-email">' +
        '<div class="col-md-3  col-sm-6">' +
        '<div class="form-group">' +
        "<label >Room " +
        (roomNo+1) +
        " </label>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3  col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">ADULTS </label>' +
        '<select name="" id="' +
        roomNo +
        '" class="adults form-control"  onchange="adultChange(this )" >' +
        ' <option value="1">01</option>' +
        '<option value="2">02</option>' +
        '<option value="3">03</option>' +
        '<option value="4">04</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3 col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">CHILDREN</label>' +
        '<select name="" id="' +
        roomNo +
        '" class="child form-control"  onchange="childChange(this )" >' +
        '<option value="">0</option>' +
        '<option value="">01</option>' +
        '<option value="">02</option>' +
        '<option value="">03</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3 col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">INFANT' +
        "</label>" +
        '<select name=""  id="' +
        roomNo +
        '" class=" infant form-control"  onchange="infantChange(this )" >' +
        '<option value="">01</option>' +
        '<option value="">02</option>' +
        '<option value="">03</option>' +
        '<option value="">04</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>";

      var room = {
        id: i,
        adult: 1,
        child: 0,
        infant: 0
      };

      roomsList.push(room);
      $("#roomsList").val(JSON.stringify(roomsList));
    }

    return html;
  }




  function createRoom(room) {
    var html = "";
    var roomsCount = room.id;
    
    for (i = 1; i < roomsCount; i++) {
      var roomNo = i ;

      html =
        html +
        '<div class="row pax-array">' +
        '<div class="col-md-3  col-sm-6">' +
        '<div class="form-group">' +
        "<label >Room " +
        (roomNo+1) +
        " </label>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3  col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">ADULTS </label>' +
        '<select name="" id="' +
        roomNo +
        '" class="adults form-control"  onchange="adultChange(this )" >' +
        ' <option value="1">01</option>' +
        '<option value="2">02</option>' +
        '<option value="3">03</option>' +
        '<option value="4">04</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3 col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">CHILDREN</label>' +
        '<select name="" id="' +
        roomNo +
        '" class="child form-control"  onchange="childChange(this )" >' +
        '<option value="">0</option>' +
        '<option value="">01</option>' +
        '<option value="">02</option>' +
        '<option value="">03</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        '<div class="col-md-3 col-sm-6">' +
        '<div class="form-group">' +
        '<label for="">INFANT' +
        "</label>" +
        '<select name=""  id="' +
        roomNo +
        '" class=" infant form-control"  onchange="infantChange(this )" >' +
        '<option value="">01</option>' +
        '<option value="">02</option>' +
        '<option value="">03</option>' +
        '<option value="">04</option>' +
        "</select>" +
        "</div>" +
        "</div>" +
        "</div>";

      var room = {
        id: i,
        adult: 1,
        child: 0,
        infant: 0
      };

      roomsList.push(room);
      $("#roomsList").val(JSON.stringify(roomsList));
    }

    return html;
  }

  var input = document.querySelector("#phone1"),
    errorMsg = document.querySelector("#error-msg"),
    validMsg = document.querySelector("#valid-msg");

  // here, the index maps to the error code returned from getValidationError - see readme
  var errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number"
  ];

  var iti = window.intlTelInput(input, {
    utilsScript:
      "https://moa-static-files.s3-us-west-2.amazonaws.com/css/utils.js"
  });
  var iti = intlTelInput(input, {
    initialCountry: "GB"
  });

  // on blur: validate
  input.addEventListener("blur", function() {
    // reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        var num = input.value.trim();
        document.getElementById("phoneNumber").value = num;
        request.mobile = num;
        document.getElementById("phoneNumber-l").innerHTML = "";
        document.getElementById("phone").classList.remove("error-b");
      } else {
        document.getElementById("phoneNumber").value = "";
        document.getElementById("phoneNumber-l").innerHTML =
          "Enter valid mobile number";
        document.getElementById("phone").classList.add("error-b");
      }
    }
  });
  input.addEventListener("change", reset);
  input.addEventListener("keyup", reset);
});

function adultChange(data) {
  var roomList = JSON.parse($("#roomsList").val());

  roomList[data.id].id=data.id;
  roomList[data.id].adult = data.value;
  $("#roomsList").val(JSON.stringify(roomList));
 // alert(JSON.stringify(roomList));
}

function childChange(data) {
  var roomList = JSON.parse($("#roomsList").val());
 
  roomList[data.id].child = data.value;
  $("#roomsList").val(JSON.stringify(roomList));
}
function infantChange(data) {
  var roomList = JSON.parse($("#roomsList").val());
  roomList[data.id].infant = data.value;
  $("#roomsList").val(JSON.stringify(roomList));
}
