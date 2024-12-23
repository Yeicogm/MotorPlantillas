$(document).ready(function () {
  /*global io*/
  let socket = io();

  socket.on('user', (data) => { //escucha evento 'user del servidor'
    $('#num-users').text(data.currentUsers + ' usuarios online');
    let message = data.username + (data.connected ? ' se ha unido al chat.' : ' se pira del chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
    scrollToBottom();
  });

  socket.on('chat message', data => { //escucha chat message
    //console.log('socket.on 1')
    $('#messages').append($('<li>').text(`${data.username}: ${data.message}`));
    scrollToBottom();
  })

  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    let messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);//envia msg al server
    $('#m').val('');
    $('#m').focus();
    scrollToBottom();
    return false; // prevent form submit from refreshing page
  });  
  // Función para desplazarse al último mensaje
   function scrollToBottom() { 
  var chatBox = document.getElementById('messages');
   chatBox.scrollTop = chatBox.scrollHeight;
 
  }
 
});
