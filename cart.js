document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span><i class="fa fa-inr"></i> ${item.price}</span>
        `;
        cartItemsContainer.appendChild(itemElement);

        totalPrice += parseFloat(item.price);
    });

    const totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.innerHTML = `
        <span>Total Price:</span>
        <span><i class="fa fa-inr"></i> ${totalPrice.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(totalPriceElement);

    document.getElementById('checkout-btn').addEventListener('click', () => {
        const pizzas = [];
        const nonPizzas = [];

        cartItems.forEach(item => {
            const orderItem = {
                id: item.id,
                quantity: item.quantity || 1
            };

            if (item.type === 'pizza') {
                pizzas.push(orderItem);
            } else {
                nonPizzas.push(orderItem);
            }
        });

        const placeOrderRequest = {
            pizzas: pizzas.map(p => ({
                pizza_id: p.id,
                quantity: p.quantity
            })),
            non_pizzas: nonPizzas.map(np => ({
                non_pizza_id: np.id,
                quantity: np.quantity
            })),
            payment_amount: totalPrice.toFixed(2)
        };

        fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(placeOrderRequest)
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            alert('Order placed successfully!');
            // Clear the cart after successful checkout
            localStorage.removeItem('cartItems');
            window.location.href = 'order-confirmation.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error placing your order.');
        });
    });
});