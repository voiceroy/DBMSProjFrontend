document.addEventListener("DOMContentLoaded", function () {
  const qtyInputs = document.querySelectorAll('input[type="number"]');
  const totalDisplay = document.getElementById("total");

  function updateTotal() {
    let total = 0;
    qtyInputs.forEach((input) => {
      const price = parseFloat(input.getAttribute("data-price"));
      const quantity = parseInt(input.value, 10);
      total += price * quantity;
    });
    totalDisplay.textContent = total.toFixed(2);
  }

  qtyInputs.forEach((input) => {
    input.addEventListener("input", updateTotal);
  });

  updateTotal();
});
