function searchProduct() {
  let value = document.getElementById("search").value.toLowerCase();

  let products = document.getElementsByClassName("product");

  for (let i = 0; i < products.length; i++) {
    if (products[i].innerText.toLowerCase().includes(value))
      products[i].style.display = "block";
    else products[i].style.display = "none";
  }
}

function buy() {
  alert("Product selected for purchase!");
}

function sell() {
  alert("Add product details to sell your product.");
}
