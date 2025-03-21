const yearFooter = function () {
  const date = document.getElementById("year");
  date.innerText = new Date().getFullYear();
};

yearFooter();

const getProductDetails = async (productId) => {
  if (!productId) {
    console.error("ID del prodotto non valido!");
    return;
  }

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzI4MjM4MzRiZjAwMTUwMDA3MGQiLCJpYXQiOjE3NDI1NDk2MzQsImV4cCI6MTc0Mzc1OTIzNH0.0a6NnpNfykCr-IheAbc2RfSVRV9-sd0O3Sb7T4CRo4E",
      },
    }
  );

  if (response.ok) {
    const product = await response.json();
    displayProductDetails(product);
  } else {
    console.error("Errore nel recupero dei dettagli del prodotto");
  }
};

const displayProductDetails = (product) => {
  const productDetailsContainer = document.getElementById("productDetails");

  productDetailsContainer.innerHTML = `
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Marca: ${product.brand}</p>
          <p>Prezzo: €${product.price}</p>
          <img src="${product.imageUrl}" alt="${product.name}" style="max-width: 300px;"/>
        `;

  // Associa l'ID alla modifica e cancellazione
  document.getElementById("editButton").onclick = () =>
    editProductForm(product.id);
  document.getElementById("deleteButton").onclick = () =>
    deleteProduct(product.id);
};

const editProductForm = (productId) => {
  if (!productId) {
    console.error("ID del prodotto non valido per la modifica!");
    return;
  }
  window.location.href = `backOffice.html?id=${productId}`; // Redireziona alla pagina di modifica
};

const deleteProduct = async (productId) => {
  if (!productId) {
    console.error("ID del prodotto non valido per la cancellazione!");
    return;
  }

  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${productId}`,
    {
      method: "DELETE", // Metodo DELETE per eliminare
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzI4MjM4MzRiZjAwMTUwMDA3MGQiLCJpYXQiOjE3NDI1NDk2MzQsImV4cCI6MTc0Mzc1OTIzNH0.0a6NnpNfykCr-IheAbc2RfSVRV9-sd0O3Sb7T4CRo4E",
      },
    }
  );

  if (response.ok) {
    alert("Prodotto eliminato con successo!");
    window.location.href = "homepage.html"; // Redireziona alla homepage
  } else {
    alert("Errore nella cancellazione del prodotto.");
  }
};

// Ottieni l'ID del prodotto dalla query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

console.log("ID prodotto dalla query string:", productId);

if (productId) {
  getProductDetails(productId);
} else {
  console.error("ID del prodotto mancante nella URL!");
}
