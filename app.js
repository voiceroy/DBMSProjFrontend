const order = document.getElementById('order-btn');
order.addEventListener("click", () => {
    window.location.href = 'http://127.0.0.1:5500/#piz';
});

const sign = document.getElementById('btn');
sign.addEventListener("click", () => {
    window.location.href = 'http://127.0.0.1:5500/login.html';
});

const cart = document.getElementById('btn-cart');
cart.addEventListener("click", () => {
    window.location.href = 'http://127.0.0.1:5500/cart.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        document.getElementById('btn').style.display = "none";
        document.getElementById('logout-btn').style.display = 'inline';
    } else {
        document.getElementById('btn').style.display = 'inline';
        document.getElementById('logout-btn').style.display = 'none';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
});

fetch('http://172.16.0.93:8080/items') // Replace with your backend endpoint URL
.then(response => response.json())
.then(data => {
    const pizzaContainer = document.getElementById('pizza-container');
    const nonPizzaContainer = document.getElementById('non-pizza-container');

    // Display pizza items
    data.pizzas.forEach(pizza => {
        const pizzaItem = document.createElement('div');
        pizzaItem.classList.add('pizza-item');
        pizzaItem.innerHTML = `
            <img src="chicken.jpg" alt="${pizza.name}"> <!-- Replace with actual image URLs if available -->
            <p>${pizza.name}</p>
            <p><i class="fa fa-inr"></i> ${pizza.price}</p>
            <button class="add-to-cart-btn">ADD TO CART</button>
        `;
        pizzaContainer.appendChild(pizzaItem);
    });

    // Display non-pizza items
    data.non_pizzas.forEach(nonPizza => {
        const nonPizzaItem = document.createElement('div');
        nonPizzaItem.classList.add('pizza-item');
        nonPizzaItem.innerHTML = `
            <img src="non_pizza_placeholder.jpg" alt="${nonPizza.name}"> <!-- Replace with actual image URLs if available -->
            <p>${nonPizza.name}</p>
            <p><i class="fa fa-inr"></i> ${nonPizza.price}</p>
            <button class="add-to-cart-btn">ADD TO CART</button>
        `;
        nonPizzaContainer.appendChild(nonPizzaItem);
    });

    // Attach event listeners for "Add to Cart" buttons
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.target.parentElement;
            const itemName = item.querySelector('p').textContent;
            const itemPrice = item.querySelector('p:nth-child(3)').textContent;
            cartItems.push({ name: itemName, price: itemPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${itemName} added to cart!`);
        });
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});
