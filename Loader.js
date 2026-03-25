async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

let cartCounter = 0;

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header", "header.html");
  await loadComponent("footer", "footer.html");
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      const card = `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card h-100">
            <img class="card-img-top p-3" src="${product.image}" alt="${product.title}" 
              style="height:220px;object-fit:contain;background:#161616" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text flex-grow-1 text-truncate">${product.description}</p>
              <p class="fw-bold">${product.price} kr</p>
              <a href="#" class="btn btn-warning mt-auto w-100">Add to cart</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById("product-grid").innerHTML += card;
    });

    document.querySelectorAll(".btn.btn-warning").forEach((button) => {
      button.addEventListener("click", () => {
        cartCounter++;
        document.querySelector(".fa-cart-shopping").textContent = cartCounter;
        
        
      });
    });
  });

  

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if (name.length < 2 || name.length > 50) {
    alert("Name must be between 2 and 50 characters.");
    return false;
  }
  if (email.length > 50 || !email.includes("@")) {
    alert("Email must be at most 50 characters and contain @.");
    return false;
  }
  if (address.length < 2 || address.length > 50) {
    alert("Address must be between 2 and 50 characters.");
    return false;
  }
  if (phone.length < 10 || phone.length > 20) {
    alert("Phone number must be between 10 and 20 characters.");
    return false;
  }
  if (!name || !email || !address) {
    alert("Please fill in all fields.");
    return false;
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("phone").value = "";
  alert("Order submitted successfully!");
  return true;
}

const submitButton = document.querySelector("button[type='submit']");
if (submitButton) {
  submitButton.addEventListener("click", validateForm);
}