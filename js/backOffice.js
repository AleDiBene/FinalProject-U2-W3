const yearFooter = function () {
  const date = document.getElementById("year");
  date.innerText = new Date().getFullYear();
};

yearFooter();

const submitForm = async () => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = parseFloat(document.getElementById("price").value);

  const product = {
    name,
    description,
    brand,
    imageUrl,
    price,
  };

  if (!validateForm(product)) return;

  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzI4MjM4MzRiZjAwMTUwMDA3MGQiLCJpYXQiOjE3NDI1NDk2MzQsImV4cCI6MTc0Mzc1OTIzNH0.0a6NnpNfykCr-IheAbc2RfSVRV9-sd0O3Sb7T4CRo4E",
      },
      body: JSON.stringify(product),
    }
  );

  if (response.ok) {
    alert("Prodotto creato con successo!");
    resetForm();
  } else {
    alert("Errore nella creazione del prodotto.");
  }
};

const validateForm = (product) => {
  const { name, description, brand, imageUrl, price } = product;
  if (!name || !description || !brand || !imageUrl || !price) {
    alert("Tutti i campi sono obbligatori!");
    return false;
  }
  return true;
};

const resetForm = () => {
  document.getElementById("productForm").reset();
};
