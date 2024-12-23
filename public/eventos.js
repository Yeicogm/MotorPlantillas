// Asegúrate de que el DOM esté completamente cargado antes de ejecutar cualquier código que manipule el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Crear el evento personalizado
  const textChangeEvent = new Event('textchange');

  // Obtener el elemento de entrada de la contraseña de login
  const loginPasswordInput = document.getElementById('login-password');
  const loginUserInput = document.getElementById('login-user');
  const regUserInput = document.getElementById('reg-user')
  const regPasswordInput = document.getElementById('reg-password')
  var imgBlob = document.getElementById("imgBlob");
  // Función para despachar el evento personalizado
  const dispatchTextChangeEvent = (inputElement) => {
    inputElement.dispatchEvent(textChangeEvent);
  };

  // Añadir oyente de eventos para el evento personalizado
  const addTextChangeListener = (inputElement) => {
    inputElement.addEventListener('textchange', () => {
      //console.log(`El evento textchange se ha disparado para ${inputElement.id}!`);
      var formularioReg = document.getElementById("formReg");
      var formularioLogin = document.getElementById("formLogin");
  
      if (loginPasswordInput.value.length > 0 || loginUserInput.value.length > 0) {
        formularioReg.classList.add("oculto");
        setTimeout(function() {
          formularioReg.classList.add("borra");
        }, 1000); 
        
      } else { 
        setTimeout(function() {
        formularioReg.classList.remove("oculto");
        formularioReg.classList.remove("borra");
      }, 1200); 
      }

      if (regPasswordInput.value.length > 0 || regUserInput.value.length > 0) {
        formularioLogin.classList.add("oculto");
        setTimeout(function() {
          formularioLogin.classList.add("borra");
        }, 1000); 
      } else { 
        setTimeout(function() {
        formularioLogin.classList.remove("oculto");
        formularioLogin.classList.remove("borra");
      }, 1200); 
      }
     
     
      if (loginUserInput.value.length > 5 || regUserInput.value.length > 5) {
         imgBlob.src = 'public/img/blob/4.jpg'; 
      } else if (loginUserInput.value.length > 2 || regUserInput.value.length > 2) {
          imgBlob.src = 'public/img/blob/3.jpg'; 
      } else if (loginUserInput.value.length > 0 || regUserInput.value.length > 0) {
          imgBlob.src = 'public/img/blob/2.jpg';
       } else { 
        imgBlob.src = 'public/img/blob/1.jpg'; 
      } 
      if (loginPasswordInput.value.length > 0 || regPasswordInput.value.length > 0){
        imgBlob.src = 'public/img/blob/5.jpg';
      }
      
    });

    // Despachar el evento personalizado cuando el valor del input cambie
    inputElement.addEventListener('input', () => {
      dispatchTextChangeEvent(inputElement);
    });
  };

  // Añadir oyente de eventos para el input de contraseña de login
  if (loginPasswordInput) addTextChangeListener(loginPasswordInput);
  if (loginUserInput) addTextChangeListener(loginUserInput);
  if (regUserInput) addTextChangeListener(regUserInput);
  if (regPasswordInput) addTextChangeListener(regPasswordInput);
 
});
