var host = "http://45.55.170.108/api/v1/";
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
  var form = $(this);
  var button = form.find('button[type=submit]').first();
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
      button.popover({
        animation: true,
        content: 'El correo o contraseña proporcionados son incorrectos.',
        placement: 'bottom'
      });
      button.popover('show');
      setTimeout(function() {
        button.popover('destroy')
      }, 5000);
    }
  });
});

$('#createUser').submit(function(e) {
  e.preventDefault();
  var form = $(this);
  var button = form.find('button[type=submit]').first();
  var passwords = form.find('[type=password]');

  if (passwords.eq(0).val() !== passwords.eq(1).val()) {
    button.popover({
      animation: true,
      content: 'Las contraseñas que proporcionó deben coincidir.',
      placement: 'bottom'
    });
    button.popover('show');
    setTimeout(function() {
      button.popover('destroy')
    }, 5000);
    return;
  }

  $.ajax({
    method: 'POST',
    url: host + 'register/',
    data: form.serialize(),
    success: function (user) {
      var credentials = {
        email: user.email,
        password: form.find('[name=password]').first().val(),
        device_os: 'web'
      };
      $.ajax({
        method: 'POST',
        url: host + 'api-token-auth/',
        data: $.param(credentials),
        success: function(data) {
          var send = '?token=' + data.token +
            '&id=' + data.user.id +
            '&name=' + data.user.name;
          window.location.href = web + send
        },
        error: function() {

        }
      });
    },
    error: function(error) {
      if (error.responseJSON.email) {
        button.popover({
          animation: true,
          content: 'El nombre de correo que desea registrar ya existe.',
          placement: 'bottom'
        });
        button.popover('show');
        setTimeout(function() {
          button.popover('destroy')
        }, 5000);
        return;
      }
    }
  });
});

$('#datepicker').datepicker({
  dateFormat: 'yy-mm-dd'
});

$('#recover').click(function(e){
  e.preventDefault();
  var button = $(this);
  button.popover({
    animation: true,
    placement: 'top',
    html: true,
    title: 'Recuperar contraseña',
    content: '<form class="recover"><div class="form-group"><input class="form-control" type="text" name="email" placeholder="Correo electrónico"></div><button type="submit" class="btn btn-primary">Recuperar</button></form>'
  });
  button.popover('show');
  $('.recover').submit(function(e){
    e.preventDefault();
    var form = $(this);
    $.ajax({
      method: 'POST',
      url: host + 'recoverPassword/',
      data: form.serialize(),
      success: function() {
        form.html('<p>Hemos enviado un correo electrónico a su bandeja para continuar con el proceso de recuperación de contraseña.</p>');
        setTimeout(function(){
          button.popover('destroy');
        }, 5000);
      },
      error: function(){
        form.html('<p>El correo que proporcionó no es válido</p>');
        setTimeout(function(){
          button.popover('destroy');
        }, 5000);
      }
    })
  });
});