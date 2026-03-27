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
              <a href="#" class="btn btn-warning mt-auto w-100">
              Add to cart</a>
            </div>
          </div>
        </div>
      `;
      document.querySelector(".product-grid").innerHTML += card;
    });

    document.querySelectorAll(".btn.btn-warning").forEach((button) => {
      button.addEventListener("click", () => {
        
        window.location.href = "Orderform.html";
      });
    });
  });
   // fixa så denna fungerar
  const form = document.querySelector("form");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); 
  form.classList.add("was-validated"); 
   alert("Order submitted successfully!");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("adress").value;
  const phone = document.getElementById("phone").value;
  const zipcode = document.getElementById("zipcode").value;
  const city = document.getElementById("city").value;

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("adress").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("zipcode").value = "";
  document.getElementById("city").value = "";

  if(!form.checkValidity()) {
    return;
  }
  

});



/* function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("adress").value;
  const phone = document.getElementById("phone").value;
  const zipcode = document.getElementById("zipcode").value;

  if (!name || !email || !address || !phone || !zipcode) {
    alert("Please fill in all fields.");
    return false;
  }

  

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("adress").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("zipcode").value = "";
  alert("Order submitted successfully!");
  return true;
}*/


 
