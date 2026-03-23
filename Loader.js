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
        alert("Added to cart!");
        window.location.href = "Orderform.html";
      });
    });
  });
