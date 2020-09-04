
//---------------------------------------------------------
//---------------- ENVIAR MAIL ---------------------
//funcion para establecer contacto mediante correo electronico.
function sendMail() {
  var name = $('#contact #fname').val();
  var lastname = $('#contact #lname').val();
  var email = $('#contact #email').val();
  var mensaje = $('#contact #mensaje').val();
  window.open('../html/contacto.html');
  window.location.href = 'mailto:marsattacksaplicamultimedia@hotmail.com?subject=The subject - ' + name + lastname + ' (' + email + ')' + '&body=' + mensaje;
}
