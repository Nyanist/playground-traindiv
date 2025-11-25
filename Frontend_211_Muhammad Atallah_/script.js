const alertclassBtn = document.querySelector(".btn-light");
alertclassBtn.addEventListener("click", function () {
  alert("warna teksnya keganti");
});

const alertcalendarBtn = document.querySelector(".btn-dark");
alertcalendarBtn.addEventListener("click", function () {
  alert("warna bgnya keganti");
});

const textcolorclassBtn = document.querySelector(".btn-light");

textcolorclassBtn.addEventListener("click", function () {
  if (document.body.style.color === "#2fbb77ff") {
    document.body.style.color = "#111839";
  } else {
    document.body.style.color = "#2fbb77ff";
  }
});

const bgcolorcalendarBtn = document.querySelector(".btn-dark");

let isChanged = false;

bgcolorcalendarBtn.addEventListener("click", function () {
  if (isChanged) {
    document.body.style.backgroundColor = "#111839";
  } else {
    document.body.style.backgroundColor = "#3a3a40ff";
  }

  isChanged = !isChanged;
});
