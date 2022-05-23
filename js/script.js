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

/** Evita cambios en el tamaño de imagen cuando la barra superior se "esconde"
 * en navegadores móviles */

// Ancho de la ventana
var myWindowWidth = window.innerWidth;

window.addEventListener("resize", (event) => {
  // Si el ancho es igual, seguramente el estado de la barra cambió
  if (myWindowWidth == window.innerWidth) {
    return;
  }

  // En caso contrario, actualiza el ancho de la ventana
  myWindowWidth = window.innerWidth;
});
