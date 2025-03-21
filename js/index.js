const yearFooter = function () {
  const date = document.getElementById("year");
  date.innerText = new Date().getFullYear();
};

yearFooter();

const getProducts = async () => {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzI4MjM4MzRiZjAwMTUwMDA3MGQiLCJpYXQiOjE3NDI1NDk2MzQsImV4cCI6MTc0Mzc1OTIzNH0.0a6NnpNfykCr-IheAbc2RfSVRV9-sd0O3Sb7T4CRo4E",
      },
    }
  );

  const products = await response.json();

  if (products && products.length > 0) {
    const productsContainer = document.getElementById("productsContainer");

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "mb-4");

      productCard.innerHTML = `
          <div class="card">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">€${product.price}</p>
              <a href="details.html?id=${product._id}" class="btn btn-primary">Dettagli</a>
            </div>
          </div>
        `;

      productsContainer.appendChild(productCard);
    });
  } else {
    const message = document.createElement("p");
    message.classList.add("text-center");
    message.textContent = "Nessun prodotto disponibile.";
    document.getElementById("productsContainer").appendChild(message);
  }
};

getProducts();
