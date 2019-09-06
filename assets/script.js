
        var defDeparture = 'LON';
        var dateSelected=0;
        if (defDeparture != null && defDeparture != "") {
            $('#dealDepAirport').select2().val(defDeparture).trigger("change");
        }

        var defNights = '';
        if(defNights != null && defNights != ""){
            $('#dealNoNights').select2().val(defNights).trigger("change");
        }

        $('#dealDepAirport,#dealNoNights').change(function () {

            getCalendarValues_MC();

        });

     

        function getCalendarValues_MC() {

            var monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

            var tourID = $('#currentDealID').val();
            var depAirport = $('#dealDepAirport').val();
            var nights = $('#dealNoNights').val();
           
            var selected_year_month = $(".calMonthPriceSelected").attr("value");

            var month_ = parseInt(selected_year_month.split("-")[1]);
            var monthName=monthNames[month_-1];

            if (month_.toString().length < 2)
                month_ = "0" + month_;

            var year_ = parseInt(selected_year_month.split("-")[0]);
            year_ = year_.toString().substring(2);

            var month = month_ + "-" + year_;

           
            $('#calendarPreLoader').show();
            $.ajax({

                url: 'https://clickmybooking.com/api/get-rates',
                type: 'GET',
                dataType: 'JSON',
                traditional: true,
                data: {
                    tourID: tourID,
                    month: monthName,
                    airport:depAirport,
                    nights: nights
                },
                success: function (data) {
                   
                    
                    if (data.msg == "Success") {
                        console.log('sucess');
                        console.log(data);
                        $('#mob_selMonth').empty();
                        $("#mob_selMonth").append(data.mobileMonth);
                        bindCalendarValues_MC(data);
                    } else {
                        alert(data.msg);
                    }
                    $('#calendarPreLoader').hide();
                }
            });
        }

        function bindCalendarValues_MC(data) {
            var cal = new Calendar();
            var cuNights = '4' + " Nights";
            var selected_year_month = $(".calMonthPriceSelected").attr("value");
            var year = parseInt(selected_year_month.split("-")[0], 10);
            var month = parseInt(selected_year_month.split("-")[1], 10);
            var markup = $('#currentDealMarkup').val();
           // $("#nightBoardBasis").text(cuNights);

            var price_arr = [];

            
            for (var i = 0; i < data.dealDates.length; i++) {

                console.log(data.dealDates[i])
                console.log(data.dealMCFares[i])
               // price_arr[data.dealDates[i]] = '&pound;' + (parseInt(data.dealMCFares[i]) + parseInt(data.priceInclusion1) + parseInt(data.priceInclusion2) + parseInt(data.priceInclusion3) + parseInt(markup));
                price_arr[data.dealDates[i]]=data.dealMCFares[i];
                console.log( price_arr[i])
            }

            for (i = 0; i < price_arr.length; i++) {
                if (price_arr[i] == "&pound;NaN")
                    price_arr[i] = "undefined";
            }

           
            cal.generateHTML(month - 1, year, [], price_arr);
            $(".calendar").html(cal.getHTML());
        }

        $(document).ready(function () {
            // ------------------------------


            var defaultCalDate = '2019-08';

            $(".calMonthPrice").each(function () {

                currentValue = $(this).attr("value");

                if (currentValue == defaultCalDate) {
                    $('.calMonthPrice').removeClass('calMonthPriceSelected');
                    $(this).addClass('calMonthPriceSelected');
                }

            });

            getCalendarValues_MC();

            $("#monthSlider").click(function () {
                getCalendarValues_MC();
            });


            $(".goto-writereview-pane").click(function (e) {
                e.preventDefault();
                $('#cruise-features .tabs a[href="#cruise-write-review"]').tab('show')
            });

            // editable rating
            $(".editable-rating.five-stars-container").each(function () {
                var oringnal_value = $(this).data("original-stars");
                if (typeof oringnal_value == "undefined") {
                    oringnal_value = 0;
                } else {
                    //oringnal_value = 10 * parseInt(oringnal_value);
                }
                $(this).slider({
                    range: "min",
                    value: oringnal_value,
                    min: 0,
                    max: 5,
                    slide: function (event, ui) {

                    }
                });
            });


        

            $('#dealNoNights,#dealDepAirport').change(function(){
               // alert();
               getCalendarValues_MC();
               var selected_year_month = $(".calMonthPriceSelected").attr("value");
              
            })

           
        });

       

        $(document).ready(function() {
            console.log("php");
          
                   $('#myModal').modal('show');
          
          // hf
              });
          
          
          // International Telephone Input {{ asset('js/tel/utils.js?1549804213570')}}
          
          
          var input = document.querySelector("#phone"),
           input2 = document.querySelector("#phone2"),
            errorMsg = document.querySelector("#error-msg"),
            validMsg = document.querySelector("#valid-msg");
          
          // here, the index maps to the error code returned from getValidationError - see readme
          var errorMap = [ "Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
          
          // initialise plugin
          // initialise plugin
          var iti = window.intlTelInput(input, {
            utilsScript: "tel/utils.js"
          });
          var iti = intlTelInput(input, {
            initialCountry: "UK"
          });
          var iti = window.intlTelInput(input2, {
            utilsScript: "tel/utils.js"
          });
          var iti = intlTelInput(input2, {
            initialCountry: "UK"
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
          
          

          function dateSel($data){

            var info=$data.split(':');
            $('#dateSelected').val(info[0]);
            $('#priceSelected').val(info[1]);
          
            var selected_year_month = $(".calMonthPriceSelected").attr("value");
            var year = parseInt(selected_year_month.split("-")[0], 10);
            var month = parseInt(selected_year_month.split("-")[1], 10);
            var depAirport = $('#dealDepAirport').val();
            var nights = $('#dealNoNights').val();

           // alert($data);
            $('#exampleModal').modal('show');


        }


     
          // International Telephone Input End 
          