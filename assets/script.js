
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

            var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
"JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];

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

            var package = $('#package').val();

         
           
            $('#calendarPreLoader').show();
            $.ajax({
            
                url: '/api/rates',
                type: 'GET',
                dataType: 'JSON',
                traditional: true,
                data: {
                    tourID: tourID,
                    month: monthName,
                    airport:depAirport,
                    nights: nights,
                    package:package
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
           

            console.log(data)
            var price_arr = [];

            
            for (var i = 0; i < data.dealDates.length; i++) {

                console.log(data.dealDates[i])
                console.log(data.dealMCFares[i])
               price_arr[data.dealDates[i]]=data.dealMCFares[i];
                console.log( price_arr[i])
            }

            for (i = 0; i < price_arr.length; i++) {
                if (price_arr[i] == "&pound;NaN")
                    price_arr[i] = "undefined";
            }

           
            cal.generateHTML(month - 1, year, [], price_arr);
         //   console.log(cal.getHTML());
            $(".calendar").html(cal.getHTML());
        }

        $(document).ready(function () {
            // ------------------------------


            var defaultCalDate = '2020-01';

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

        
            $(".editable-rating.five-stars-container").each(function () {
                var oringnal_value = $(this).data("original-stars");
                if (typeof oringnal_value == "undefined") {
                    oringnal_value = 0;
                } else {
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
           
               getCalendarValues_MC();
               var selected_year_month = $(".calMonthPriceSelected").attr("value");
              
            })

           
        });

       

        $(document).ready(function() {
            console.log("php");
          
                   $('#myModal').modal('show');
      
              });
          
          
   
          
          

          function dateSel($data){

            var info=$data.split(':');
            $('#dateSelected').val(info[0]);
            $('#priceSelected').val(info[1]);
          
            var selected_year_month = $(".calMonthPriceSelected").attr("value");
            var year = parseInt(selected_year_month.split("-")[0], 10);
            var month = parseInt(selected_year_month.split("-")[1], 10);
            var depAirport = $('#dealDepAirport').val();
            var nights = $('#dealNoNights').val();

         
            $('#exampleModal').modal('show');


        }


     
          