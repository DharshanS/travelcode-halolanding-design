
        var defDeparture = 'LON';
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

            var tourID = $('#currentDealID').val();
            var depAirport = $('#dealDepAirport').val();
            var nights = $('#dealNoNights').val();
            var selected_year_month = $(".calMonthPriceSelected").attr("value");
            var month_ = parseInt(selected_year_month.split("-")[1]);
            if (month_.toString().length < 2)
                month_ = "0" + month_;

            var year_ = parseInt(selected_year_month.split("-")[0]);
            year_ = year_.toString().substring(2);

            var month = month_ + "-" + year_;

            $('#calendarPreLoader').show();
            $.ajax({

                url: 'date.json',
                type: 'POST',
                dataType: 'JSON',
                traditional: true,
                data: {
                    tourID: tourID,
                    dealMonth: month,
                    depAirport: depAirport,
                    noNights: nights
                },
                success: function (data) {
                    console.log("Data"+data);
                    
                    if (data.msg == "Success") {
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
                price_arr[data.dealDates[i]] = '&pound;' + (parseInt(data.dealMCFares[i]) + parseInt(data.priceInclusion1) + parseInt(data.priceInclusion2) + parseInt(data.priceInclusion3) + parseInt(markup));
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

        });

        $("#monthSlider").owlCarousel({

          items: 6,
          loop: true,
          navigation: true,
          navigationText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
          dots: false,
          autoPlay: false,
          autoPlayHoverPause: false,
          dotsData: true,
          responsive: {
              0: {
                  items: 1
              },
              480: {
                  items: 2
              },
              768: {
                  items: 4
              }
          }

      });

   