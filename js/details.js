const footerDate = function () {
  const year = document.getElementById("year");
  year.innerText = new Date().getFullYear();
};

footerDate();
