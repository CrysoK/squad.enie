/* HEADER Y FOOTER ************************************************************/

fetch("hf/header.html")
  .then((r) => r.text())
  .then((h) => {
    document.querySelector("header").innerHTML = h;
  });
fetch("hf/footer.html")
  .then((r) => r.text())
  .then((f) => {
    document.querySelector("footer").innerHTML = f;
  });

/* IR ARRIBA ******************************************************************/

var boton = document.querySelector("#irArriba");

// Si la página tiene #irArriba
if (boton) {
  window.onscroll = () => {
    if (document.documentElement.scrollTop > 200) {
      boton.style.display = "block";
    } else {
      boton.style.display = "none";
    }
  };

  boton.addEventListener("click", () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* VALIDACIÓN *****************************************************************/

var form = document.querySelector("form");

// Si la página tiene un form
if (form) {
  // Reinicia los campos al cargar la página
  form.reset();

  // Este objeto contiene los campos del formulario y el estado de cada uno.
  let campos = {
    correo: {
      e: form.elements.correo,
      valido: false,
    },
    mensaje: {
      e: form.elements.body,
      valido: false,
    },
    asunto: {
      e: form.elements.subject,
      valido: false,
    },
  };

  // Validar al enviar
  form.addEventListener("submit", (e) => {
    if (!correoValido(correo.value)) {
      mostrarError(campos.correo);
    } else {
      ocultarError(campos.correo);
    }
    if (!contieneTexto(mensaje.value)) {
      mostrarError(campos.mensaje);
    } else {
      ocultarError(campos.mensaje);
    }
    if (!contieneTexto(asunto.value)) {
      mostrarError(campos.asunto);
    } else {
      ocultarError(campos.asunto);
    }
    if (!todoValido(campos)) e.preventDefault();
  });

  // Validar al escribir el correo
  campos.correo.e.addEventListener("input", (e) => {
    if (correoValido(campos.correo.e.value)) {
      ocultarError(campos.correo);
      todoValido(campos);
    } else {
      mostrarError(campos.correo);
    }
  });

  // Validar al escribir el mensaje
  campos.mensaje.e.addEventListener("input", (e) => {
    if (contieneTexto(campos.mensaje.e.value)) {
      ocultarError(campos.mensaje);
      todoValido(campos);
    } else {
      mostrarError(campos.mensaje);
    }
  });

  // Validar al escribir el asunto
  campos.asunto.e.addEventListener("input", (e) => {
    if (contieneTexto(campos.asunto.e.value)) {
      ocultarError(campos.asunto);
      todoValido(campos);
    } else {
      mostrarError(campos.asunto);
    }
  });
}

/**
 * Validación simple de una dirección de correo electrónico.
 */
function correoValido(string) {
  let puntos = 0;
  let inicio = "abcdefghijklmnñopqrstuvwxyz";
  let final = "1234567890" + inicio;
  let esp = "-_.+";
  let interior = esp + inicio + final;
  let prev = "";

  let correo = string.toLowerCase().split("@");
  if (correo.length <= 1 || correo.length > 2) return false;

  // primero analiza usuario (...@), luego servidor (@...)
  for (let i = 0; i < 2; i++) {
    let parte = correo[i];

    for (let j = 0; j < parte.length; j++) {
      let char = parte[j];

      // primer carácter
      if (j == 0) {
        if (!inicio.includes(char)) return false;
        prev = char;
        continue;
      }

      // último carácter
      if (j == parte.length - 1) {
        if (!final.includes(char)) return false;
        prev = char;
        continue;
      }

      // otros
      if (!interior.includes(char)) return false;
      // si es un carácter especial, que no estén seguidos
      if (esp.includes(char)) {
        if (char == prev) return false;
        // el servidor tiene que tener al menos un punto
        if (i == 1) {
          if (char == ".") puntos++;
        }
      }
      prev = char;
    }
  }
  if (puntos <= 0) return false;
  return true;
}

/**
 * Indica si la cadena tiene al menos un carácter.
 */
function contieneTexto(string) {
  return string.length > 0;
}

/**
 * Activa el "estilo de error" y actualiza el estado del campo.
 */
function mostrarError(campo) {
  // basta un solo error para deshabilitar el botón
  document.querySelector("form button").disabled = true;
  campo.e.classList.add("error");
  campo.valido = false;
}

/**
 * Restablece el estilo normal y actualiza el estado del campo.
 */
function ocultarError(campo) {
  // un campo válido no asegura que todos sean válidos
  campo.e.classList.remove("error");
  campo.valido = true;
}

/**
 * Indica si todos los campos son válidos. En caso afirmativo, habilita el
 * botón.
 */
function todoValido(campos) {
  // para habilitar el botón es necesario validar todo
  if (Object.values(campos).every((item) => item.valido === true)) {
    document.querySelector("form button").disabled = false;
    return true;
  } else return false;
}

// /* TAMAÑO DE FONDO EN MOVIL ***************************************************/

// // Parece que no funciona
// /** Evita cambios en el tamaño de imagen cuando la barra superior se "esconde"
//  * en navegadores móviles */

// // Ancho de la ventana
// var ancho = window.innerWidth;

// window.addEventListener("resize", (event) => {
//   // Si el ancho es igual, seguramente el estado de la barra cambió
//   if (ancho == window.innerWidth) {
//     // ???
//     event.preventDefault();
//     return;
//   }

//   // En caso contrario, actualiza el ancho de la ventana
//   ancho = window.innerWidth;
// });
