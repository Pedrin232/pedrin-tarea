// Obtener elementos del DOM
const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login");
const storeSection = document.getElementById("store");

// Escuchar el evento de envío del formulario
loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Obtener valores del formulario
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  // Aquí puedes implementar la lógica de autenticación y redireccionar al usuario
  // Si el inicio de sesión es exitoso, redirigir al nuevo index
  if (email === "ejemplo@correo.com" && password === "contraseña") {
    window.location.href = "tu_tienda_online.html";
  } else {
    alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
  }
});
