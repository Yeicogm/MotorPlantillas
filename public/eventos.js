// Asegúrate de que el DOM esté completamente cargado antes de ejecutar cualquier código que manipule el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Crear el evento personalizado
  const textChangeEvent = new Event('textchange');

  // Obtener el elemento de entrada de la contraseña de login
  const loginPasswordInput = document.getElementById('login-password');
  const loginUserInput = document.getElementById('login-user');
  // Función para despachar el evento personalizado
  const dispatchTextChangeEvent = (inputElement) => {
    inputElement.dispatchEvent(textChangeEvent);
  };

  // Añadir oyente de eventos para el evento personalizado
  const addTextChangeListener = (inputElement) => {
    inputElement.addEventListener('textchange', () => {
      console.log(`El evento textchange se ha disparado para ${inputElement.id}!`);
      var formulario = document.getElementById("formReg");
  
      if (loginPasswordInput.value.length > 0 || loginUserInput.value.length > 0) {
        formulario.style.display = "none";
      } else { 
        formulario.style.display = "flex";
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
});
