const footerDate = function () {
  const year = document.getElementById("year");
  year.innerText = new Date().getFullYear();
};

footerDate();

class Photo {
  constructor(_name, _description, _brand, _foto, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.foto = _foto;
    this.price = _price;
  }
}

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const brandFoto = document.getElementById("foto");
const priceInput = document.getElementById("price");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

if (eventId) {
  fetch(eventsURL + "/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      brandInput.value = data.brand;
      brandFoto.value = data.foto;
      priceInput.value = data.price;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const concert = new Photo(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    brandFoto.value,
    priceInput.value
  );

  console.log("Photo", Photo);

  let methodToUse;
  let URLtoUse;

  if (eventId) {
    methodToUse = "PUT";
    URLtoUse = eventsURL + "/" + eventId;
  } else {
    methodToUse = "POST";
    URLtoUse = eventsURL;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(Photo),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzI4MjM4MzRiZjAwMTUwMDA3MGQiLCJpYXQiOjE3NDI1NDk2MzQsImV4cCI6MTc0Mzc1OTIzNH0.0a6NnpNfykCr-IheAbc2RfSVRV9-sd0O3Sb7T4CRo4E",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");

        form.reset(); // svuoto il form
      } else {
        throw new Error("ricevuta response non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err);
    });
});
