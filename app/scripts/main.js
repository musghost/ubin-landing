var host = "http://45.55.170.108/api/v1/";
//var web = "http://localhost:3000/#/token";
var web = "http://ubin.mellow.online/#/token";

$.ajax({
  url: host + 'typesAdvisors/',
  success: function(data) {
    var select = document.getElementById('typeAssessor');
    $.each(data.results, function(i, result) {
      var option = document.createElement('option');
      option.value = result.id;
      option.innerHTML = result.name;
      select.appendChild(option);
    });
  }
})

$('#register').click(function(e) {
  e.preventDefault();
  $('.curtain, .floating-form').fadeIn(200);
});

$('.close-curtain').click(function(e){
  e.preventDefault();
  $('.curtain, .floating-form').fadeOut(200);
});

$('#login').submit(function(e){
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: host + 'api-token-auth/',
    data: $(this).serialize(),
    success: function(data) {
      console.log(data);
      var send = '?token=' + data.token +
        '&id=' + data.user.id +
        '&name=' + data.user.name;
      window.location.href = web + send
    },
    error: function() {

    }
  });
});