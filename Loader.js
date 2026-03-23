//Den här kan ha vart gjort med lite hjälp ;) behövde bara få bort header och footer så fort som möjligt och detta funkade

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

// satta await för att det inte ska bli problem senare
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header", "header.html");
  await loadComponent("footer", "footer.html");
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      const card = `
        <div class="col">
          <div class="card h-100">
            <img class="card-img-top" src="${product.image}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text text-muted">${product.description}</p>
              <p class="fw-bold">${product.price} kr</p>
              <a href="#" class="btn btn-primary w-100">Add to cart</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById("product-container").innerHTML += card;
    });
    

    document.querySelectorAll(".btn.btn-primary").forEach((button) => {
      button.addEventListener("click", () => {
        alert("Added to cart!");
        window.location.href = "Orderform.html";
      });
    });
  });
