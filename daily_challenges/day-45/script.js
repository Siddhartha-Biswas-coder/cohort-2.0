var grow = 0;
var btn = document.querySelector("button");
var inner = document.querySelector(".inner");
var h2 = document.querySelector("h2");

btn.addEventListener("click", function () {
  btn.style.pointerEvents = "none";

  var num = 50 + Math.floor(Math.random() * 50);
  var int = setInterval(() => {
    grow += 1;
    inner.style.width = grow + "%";
    h2.innerText = grow + "%";
  }, num);

  setTimeout(() => {
    clearInterval(int);
    btn.innerHTML = "Downloaded!";
    btn.style.opacity = 0.5;
    console.log("Downloaded in " + num/10 + " seconds");
  }, num * 100);

  
});
