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
   
  
//document.querySelector("form")
const form = document.querySelector("form");
if (!form) return;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Formulär skickat!");
  

  let isValid = true;

  form.classList.add("was-validated"); 
   //alert("Order submitted successfully!");
  const name = document.getElementById("name");//.value;
  const email = document.getElementById("email");//.value;
  const address = document.getElementById("adress");//.value;
  const phone = document.getElementById("phone");//.value;
  const zipcode = document.getElementById("zipcode");//.value;
  const city = document.getElementById("city");//.value;
 

  // document.getElementById("name").value = "";
  // document.getElementById("email").value = "";
  // document.getElementById("adress").value = "";
  // document.getElementById("phone").value = "";
  // document.getElementById("zipcode").value = "";
  // document.getElementById("city").value = "";

  document.querySelectorAll("input").forEach(input => {
    input.classList.remove("is-invalid");
  })
    // Namn
 const fullNamePattern = /^(?=.{2,50}$)(?:[a-zA-Z]+(?:\s[a-zA-Z]+){1,})$/;

if (name.value.trim() === "" || !fullNamePattern.test(name.value.trim())) {
  isValid = false;
  name.value = "";
  name.placeholder = "Please enter first and last name";
  name.classList.add("red-placeholder");
}
  
  //telefon
  const phonePattern = /^[\d()-]{1,20}$/;
  if (!phonePattern.test(phone.value.trim())) {
    phone.classList.add("is-invalid");
    isValid = false;
      phone.value = "";
    phone.placeholder = "Please enter a valid phone number (max 20 characters)";
    phone.classList.add("red-placeholder");
  }
  // Email
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add("is-invalid");
    isValid = false;
    email.value = "";
    email.placeholder = "Please enter a valid email address";
    email.classList.add("red-placeholder");

  }

  // Adress
  if (address.value.trim().length < 2) {
    address.classList.add("is-invalid");
    isValid = false;
    address.placeholder = "Please enter your address";
    address.classList.add("red-placeholder");
  }
   // Stad
  if (city.value.trim().length < 2) {
    city.classList.add("is-invalid");
    isValid = false;
   city.placeholder = "Please enter your city";
    city.classList.add("red-placeholder");
  }


  // Postnummer
 const zipcodePattern = /^\d+$/;
    if (zipcode.value.toString().trim().length !== 5 || !zipcodePattern.test(zipcode.value.toString().trim())) {
      isValid = false;
      zipcode.value = "";
      zipcode.placeholder = "Please enter a valid zipcode (5 digits)";
      zipcode.classList.add("red-placeholder");
    }
  

 

  if (isValid) {
    alert("Order submitted!");
    
    
    form.reset();
  }
  
  // if(!form.checkValidity()) {
  //   return;
  // }
  

});
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


 
