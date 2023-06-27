// Obtener elementos del DOM
const cartElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const loginForm = document.getElementById("login-form");

// Manejador de eventos para el botón "Agregar al carrito"
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productName = event.target.dataset.productName;
    const productPrice = parseFloat(event.target.dataset.productPrice);
    addToCart(productName, productPrice);
  }
});

// Manejador de eventos para el botón "Finalizar Compra"
checkoutBtn.addEventListener("click", checkout);

let cartItems = [];
let totalPrice = 0;

function addToCart(productName, price) {
  const existingItem = cartItems.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: productName, price: price, quantity: 1 });
  }

  totalPrice += price;
  updateCart();
}

function removeCartItem(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  totalPrice -= removedItem.price * removedItem.quantity;
  updateCart();
}

function increaseQuantity(index) {
  cartItems[index].quantity++;
  totalPrice += cartItems[index].price;
  updateCart();
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity === 1) {
    removeCartItem(index);
  } else {
    cartItems[index].quantity--;
    totalPrice -= cartItems[index].price;
    updateCart();
  }
}

// Manejador de eventos para el formulario de inicio de sesión
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  login(email, password);
});

// Función para procesar el inicio de sesión
function login(email, password) {
  // Aquí puedes implementar la lógica para verificar las credenciales del usuario
  // con una base de datos o servicio de autenticación.
  // Por simplicidad, en este ejemplo solo se muestra un mensaje de éxito.
  alert(`Inicio de sesión exitoso para el usuario ${email}`);
  // Restablecer los campos del formulario
  loginForm.reset();
}

function updateCart() {
  cartElement.innerHTML = "";

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="product${index + 1}.jpg" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>Precio: $${item.price.toFixed(2)}</p>
      <div class="quantity-control">
        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
      </div>
      <button class="remove-btn" onclick="removeCartItem(${index})">Eliminar</button>
    `;
    cartElement.appendChild(li);
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Habilitar o deshabilitar el botón de finalizar compra según si hay productos en el carrito
  checkoutBtn.disabled = cartItems.length === 0;
}
function checkout() {
  const cardNumber = document.getElementById("card-number").value;
  const cardName = document.getElementById("card-name").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;

  // Aquí puedes implementar la lógica para procesar el pago con la información de la tarjeta.
  // Por simplicidad, en este ejemplo solo se muestra un mensaje de confirmación.
  alert(`Pago exitoso con la tarjeta ${cardNumber.substr(-4)}.
    Nombre en la tarjeta: ${cardName}
    Fecha de vencimiento: ${expiryDate}
    CVV: ${cvv}`);
  
  resetCart();
}


function resetCart() {
  cartItems = [];
  totalPrice = 0;
  updateCart();
}

// Calificación de productos
const ratingForms = document.querySelectorAll('.rating-form');

ratingForms.forEach(form => {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const productIndex = parseInt(form.dataset.productIndex);
    const rating = parseInt(form.querySelector('input[name="rating"]:checked').value);
    const comment = form.querySelector('textarea[name="comment"]').value;

    // Aquí puedes enviar la calificación y el comentario al servidor
    // para almacenarlos en la base de datos.
    // Por simplicidad, en este ejemplo solo se muestra un mensaje con la información.
    alert(`Calificación enviada para el producto ${productIndex + 1}:
      Calificación: ${rating}
      Comentario: ${comment}`);

    form.reset();
  });
});
