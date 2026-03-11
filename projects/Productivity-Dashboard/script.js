function openFeatures() {
  var allElems = document.querySelectorAll(".all-Elements .elements");
  var fullElemsPage = document.querySelectorAll(".fullElem");
  var fullElemsPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemsPage[elem.id].style.display = "block";
    });
  });

  fullElemsPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      // console.log(back.id)
      fullElemsPage[back.id].style.display = "none";
    });
  });
}
openFeatures()
