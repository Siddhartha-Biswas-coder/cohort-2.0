var allElems = document.querySelectorAll(".all-Elements .elements");
var allFullElems = document.querySelectorAll(".fullElem");

allElems.forEach(function (elem) {
  elem.addEventListener("click", function () {
    console.log(allFullElems[elem.id]);
    allFullElems[elem.id].style.display = "block";
  });
});
