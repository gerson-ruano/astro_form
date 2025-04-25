// script.js
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('registro-usuarios');
    const subdestino = document.getElementById('subdestino');
    const telefono = document.getElementById('telefono');
    const errorMensaje = document.getElementById('errorMensaje');
  
    formulario.addEventListener('submit', function (e) {
      e.preventDefault(); // Previene el envío por defecto
  
      // Limpia el mensaje anterior
      errorMensaje.textContent = '';
  
      // Validación de los campos
      if (subdestino.value === '' || telefono.value.trim() === '') {
        errorMensaje.textContent = 'Por favor complete todos los campos.';
        return;
      }
  
      // Validación del teléfono: solo números y longitud de 8
      const telefonoRegex = /^[0-9]{8}$/;
      if (!telefonoRegex.test(telefono.value)) {
        errorMensaje.textContent = 'Ingrese un número de teléfono válido (8 dígitos).';
        return;
      }
  
      // Si pasa todas las validaciones, redirige o realiza alguna acción
      window.location.href = '/success.astro'; // Cambia esta línea según tus necesidades
    });
  });
  