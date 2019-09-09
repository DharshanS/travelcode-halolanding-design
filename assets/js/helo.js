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
    to: "Sales@haloflights.co.uk"
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

  $(".qte-submit").click(function() {
    var selected_year_month = $(".calMonthPriceSelected").attr("value");
    var year = parseInt(selected_year_month.split("-")[0], 10);
    var month = parseInt(selected_year_month.split("-")[1], 10);
    var depAirport = $("#dealDepAirport").val();
    var nights = $("#dealNoNights").val();

    for (let i = 0; i <= roomsList.length; i++) {
      // alert('#noOfAdults_0'+(i+1));
      var empTable = document.getElementById("#noOfAdults_test");
      // alert('empTable'+ empTable);
    }

    if (validateFirstName() && emailValidate()) {
      (request.date = {
        year: year,
        month: datsList[month],
        day: $("#dateSelected").val()
      }),
        (request.mode = $("#com_mode").val());
      request.specialRequest = $("#special_request").val();
      request.callbackTime = $("#call_bak").val();
      request.noOfRooms = roomsList;
      request.airPort = depAirport;
      request.nights = nights;
      request.price = $("#priceSelected").val();
      request.mobile = $("#phone").val();

      console.log(request);

      sendMail(request);

      //http://clickmybooking.com/tc-mailer/api/send/email
    }
  });

  $(".in-submit").click(function() {
    inqueryNow();
  });

  $(".cal-submit").click(function() {
    callInqueryNow();
  });

  $(".noOfRooms").change(function() {
    var currentRoomLength = $(".pax-array").length;
    var slectedRoomLength = $(this).val();

    console.log(currentRoomLength);
    console.log(slectedRoomLength);

    if (currentRoomLength < slectedRoomLength) {
      var room = {
        id: slectedRoomLength,
        adult: 1,
        child: 0,
        infant: 0
      };
      // roomsList.push(room);
      $(".inner-rooms").html(createRoom(room));
    } else {
      if (currentRoomLength != 1) {
        roomsList.splice(currentRoomLength - 1, 1);
        $(".pax-array")[currentRoomLength - 1].remove();
      }
    }
  });

  function sendMail(request) {
    $.ajax({
      type: "POST",
      url: "http://deals.haloflights.co.uk/api/send/email",
      contentType: "application/json",
      dataType: "JSON",

      data: JSON.stringify(request),

      success: function(data) {
        if (data == true) {
          alert("Thank you we will be contacting you soon");
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
    sendMail(request);
    //alert(JSON.stringify(request));
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

  function createRoom(room) {
    var html = "";
    var roomsCount = room.id;
    for (i = 1; i < roomsCount; i++) {
      let roomNo = i + 1;

      html =
        html +
        '<div class="row pax-array">' +
        '<div class="col-md-3  col-sm-6">' +
        '<div class="form-group">' +
        "<label >Room " +
        roomNo +
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

  var input = document.querySelector("#phone"),
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
  roomList[data.id].adult = data.value;
  $("#roomsList").val(JSON.stringify(roomList));
  alert(JSON.stringify(roomList));
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
