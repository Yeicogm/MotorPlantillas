// Asegúrate de que el DOM esté completamente cargado antes de ejecutar cualquier código que manipule el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Crear el evento personalizado
  const textChangeEvent = new Event('textchange');

  // Obtener el elemento de entrada de la contraseña de login
  const loginPasswordInput = document.getElementById('login-password');

  // Función para despachar el evento personalizado
  const dispatchTextChangeEvent = (inputElement) => {
    inputElement.dispatchEvent(textChangeEvent);
  };

  // Añadir oyente de eventos para el evento personalizado
  const addTextChangeListener = (inputElement) => {
    inputElement.addEventListener('textchange', () => {
      console.log(`El evento textchange se ha disparado para ${inputElement.id}!`);
    });

    // Despachar el evento personalizado cuando el valor del input cambie
    inputElement.addEventListener('input', () => {
      dispatchTextChangeEvent(inputElement);
    });
  };

  // Añadir oyente de eventos para el input de contraseña de login
  if (loginPasswordInput) addTextChangeListener(loginPasswordInput);
});
