const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const heartIcon = Array.from(document.querySelectorAll(".fa-heart"));

document.addEventListener("DOMContentLoaded", () => {
  randerCart();
});

heartIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    if (icon.classList.contains("active")) {
      icon.classList.remove("active");
      icon.classList.add("nonactive");
    }
    else if (icon.classList.contains("nonactive")) {
      icon.classList.remove("nonactive");
      icon.classList.add("active")
    }
  })
});

const cartBtn = document.getElementById("cart");
const cartOut = document.getElementById("cartOut");
const cartZone = document.getElementById("cartZone");
const addCartBtns = Array.from(document.querySelectorAll(".addCart"));

cartBtn.addEventListener("click", () => {
  cartZone.classList.toggle("active-cart");
});

cartOut.addEventListener("click", () => {
  cartZone.classList.remove("active-cart");
});

addCartBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const existingItem = cartItems.find(item => item.id === e.target.dataset.id);
    if (existingItem) {
      existingItem.quantity++;
      alert(`Added ${existingItem.name} to cart!`);
      randerCart();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    else if (!existingItem) {
      cartItems.push({
        id: e.target.dataset.id,
        name: e.target.dataset.name,
        price: Number(e.target.dataset.price),
        quantity: 1,
      });
      const name = e.target.dataset.name;
      alert(`Added ${name} to cart!`);
      randerCart();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  })
})

const cartArea = document.getElementById("cartArea");

function randerCart() {
  cartArea.innerHTML = "";
  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
    <h4>${item.name}</h4> price: ${item.price}฿ quantity: ${item.quantity} <button class="increase">+</button><button class="reduce">-</button>
    `
    const increaseBtn = cartItem.querySelector(".increase");
    const reduceBtn = cartItem.querySelector(".reduce");

    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      randerCart();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    })

    reduceBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        randerCart();
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
      else if (item.quantity === 1) {
        cartItems.splice(cartItems.indexOf(item), 1);
        randerCart();
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    })
    cartArea.appendChild(cartItem);

    const result = document.getElementById("totalPrice");
    let totalPrice = cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)
    result.innerHTML = `${totalPrice} ฿`;
  })
}

// Theme Mode 
const themeMode = document.getElementById("themeMode");

themeMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (themeMode.classList.contains("fa-moon")) {
    themeMode.classList.remove("fa-moon");
    themeMode.classList.add("fa-sun");
  } else if (themeMode.classList.contains("fa-sun")) {
    themeMode.classList.remove("fa-sun");
    themeMode.classList.add("fa-moon");
  }
});

// Scrooll to Special manu

const orderNowBtn = document.getElementById("orderNowBtn");
const coffeeSection = document.getElementById("coffeeSection");

orderNowBtn.addEventListener("click", () => {
  // Scroll to the coffee section smoothly
  coffeeSection.scrollIntoView({ behavior: "smooth"})
})

// Navbars for Responsive Design
const navBarOpenBtn = document.getElementById("navBarOpenBtn");
const navBarCloseBtn = document.getElementById("navBarCloseBtn");

navBarOpenBtn.addEventListener("click", () => {
  document.getElementById("navBar").classList.toggle("active-bar");
  if (cartZone.classList.contains("active-cart")) {
    cartZone.classList.remove("active-cart");
  }
})

navBarCloseBtn.addEventListener("click", () => {
  document.getElementById("navBar").classList.remove("active-bar");
})
