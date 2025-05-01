
  import { subdestinos } from '/assets/data/sub_destinos.js';

  const destinoSelect = document.getElementById('destino');
  const subdestinoSelect = document.getElementById('subdestino');
  const formulario = document.getElementById('registro-usuarios');
  const nip = document.querySelector('#nip');
  const errorMensaje = document.getElementById('errorMensaje');
  const telefono = document.getElementById('telefono');
  const alreadySubmittedMessage = document.getElementById('already-submitted');
  const submissionIdField = document.getElementById('submission-id')

  // Verificar si el formulario ya ha sido enviado
  function checkIfAlreadySubmitted() {
    const hasSubmitted = localStorage.getItem('formSubmitted');
    if (hasSubmitted === 'true') {
      // Mostrar mensaje de que ya se envió
      alreadySubmittedMessage.style.display = 'block';
      
      // Desactivar el formulario
      formulario.classList.add('form-disabled');
      
      // Desactivar el botón de envío
      document.getElementById('submit-button').disabled = true;
    }
  }

  // Generar un ID único para el envío
  function generateSubmissionId() {
    return 'submission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  destinoSelect.addEventListener('change', updateSubdestinos);

  function updateSubdestinos() {
    const selectedDestino = destinoSelect.value;
    subdestinoSelect.innerHTML =
      '<option value="" disabled selected>Seleccione un Subdestino</option>';

    if (subdestinos[selectedDestino]) {
      subdestinos[selectedDestino].forEach((subdestino) => {
        const option = document.createElement('option');
        option.value = subdestino;
        option.textContent = subdestino;
        subdestinoSelect.appendChild(option);
      });
      subdestinoSelect.disabled = false;
    } else {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No hay subdestinos';
      subdestinoSelect.appendChild(option);
      subdestinoSelect.disabled = true;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    subdestinoSelect.disabled = true;

    // Verificar si el formulario ya ha sido enviado
    checkIfAlreadySubmitted();
    
    // Generar un ID único para el envío
    submissionIdField.value = generateSubmissionId();
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    errorMensaje.innerHTML = ''; // Limpiar mensajes de error previos
    errorMensaje.classList.remove('alert-error'); // Limpiar clase antes de validar
    errorMensaje.style.display = 'none';

    const errorList = [];

    const nipRegex = /^[0-9]{4,5}$/;
    if (nip && !nipRegex.test(nip.value)) {
      errorList.push('Ingrese un número de NIP válido, ejemplo 17345');
      //e.preventDefault();
    }

    const telefonoValor = telefono.value.trim();
    if (telefonoValor !== '') {
      const telefonoRegex = /^[0-9]{8}$/;
      if (!telefonoRegex.test(telefonoValor)) {
        errorList.push('Ingrese un número de teléfono válido (8 dígitos).');
        //e.preventDefault(); // Prevenir el envío si hay errores
      }
    }

    if (errorList.length > 0) {
      // Mostrar el contenedor de errores
      errorMensaje.classList.add('alert-error');
      errorMensaje.innerHTML =
        '<ul>' +
        errorList.map((error) => `<li>${error}</li>`).join('') +
        '</ul>';
      errorMensaje.style.display = 'block'; // Mostrar el contenedor de errores
      return; // Detener el envío del formulario
    }

    // Si todo está correcto, marcar como enviado
    localStorage.setItem('formSubmitted', 'true');
    formulario.submit(); 

    // Continuar con el envío normal
    //return true;
  });
