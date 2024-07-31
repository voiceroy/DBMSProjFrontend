const order = document.getElementById("order-btn");
order.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/#piz";
});

const sign = document.getElementById("btn");
sign.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/login.html";
});

const cart = document.getElementById("btn-cart");
cart.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/cart.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    document.getElementById("btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
  } else {
    document.getElementById("btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  fetch("http://172.16.0.93:8080/logout");
  window.location.reload();
});

fetch("http://172.16.0.93:8080/items")
  .then((response) => response.json())
  .then((data) => {
    const pizzaContainer = document.getElementById("pizza-container");
    const nonPizzaContainer = document.getElementById("non-pizza-container");

    const imageUrlMapping = {
      Margherita: "pizza1.jpg",
      Pepperoni: "pizza3.jpg",
      "BBQ Chicken": "chcikenP.jpg",
      "Veggie Delight": "pizza2.jpg",
      Hawaiian: "hawaiian.jpg",
      "Garlic Bread": "Garlicbread.jpg",
      "Chicken Wings": "chicken.jpg",
      "Pasta Alfredo": "pasta.jpg",
      Salad: "salad.jpg",
      Brownie: "choco.jpg",
    };

    data.pizzas.forEach((pizza) => {
      const pizzaItem = document.createElement("div");
      pizzaItem.classList.add("pizza-item");
      console.log(pizza);
      const pizzaImageUrl = imageUrlMapping[pizza.name];
      pizzaItem.innerHTML = `
            <img src="${pizzaImageUrl}" alt="${pizza.name}"> 
            <span class="id">${pizza.pizza_id}</span>
            <span class="type">pizza</span>
            <p>${pizza.name}</p>
            <span class="price"><i class="fa fa-inr"></i> ${pizza.price}</span>
            <button class="add-to-cart-btn">ADD TO CART</button>
        `;
      pizzaContainer.appendChild(pizzaItem);
    });

    data.non_pizzas.forEach((nonPizza) => {
      const nonPizzaItem = document.createElement("div");
      nonPizzaItem.classList.add("pizza-item");
      const non_pizzaImageUrl = imageUrlMapping[nonPizza.name];
      console.log(nonPizza);
      nonPizzaItem.innerHTML = `
            <img src="${non_pizzaImageUrl}" alt="${nonPizza.name}"> 
            <span class="id">${nonPizza.non_pizza_id}</span>
            <span class="type">non-pizza</span>
            <p>${nonPizza.name}</p>
            <span class="price"><i class="fa fa-inr"></i> ${nonPizza.price}</span>
            <button class="add-to-cart-btn">ADD TO CART</button>
        `;
      nonPizzaContainer.appendChild(nonPizzaItem);
    });

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const item = event.target.parentElement;
        const item_id = item.querySelector("span.id").textContent;
        const itemName = item.querySelector("p").textContent;
        const itemPrice = item.querySelector("span.price").textContent;
        const itemType = item.querySelector("span.type").textContent;
        cartItems.push({
          id: item_id,
          name: itemName,
          price: itemPrice,
          type: itemType,
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert(`${itemName} added to cart!`);
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
