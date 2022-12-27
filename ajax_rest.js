$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      query: $("#ip").val(),
    };
	  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
	  var token = "6fd633848ef1771b3a89b8d1c18999217891bc8b";
    
    $.ajax({
      type: "GET",
      url: url + formData.query,
	    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Token "+ token) 
      },
      data: '',
      dataType: "json",
      encode: true,
    }).done(function (result) {
      console.log(result);
      $("#result").fadeOut(500, function () {
        if (result.location != null) {
          $("#result").html(result.location.data.city_type_full + ':' + result.location.data.city)  
        } else {
          $("#result").html('Ничего не найдено')  
        }        
      }).fadeIn(500);
	  }).fail(function (result) {
      $("#result").fadeOut(500, function () {
        $("#result").html('Ошибка')
      }).fadeIn(500);
    });
    event.preventDefault();
  });
});