var btn = document.querySelector("button");
var main = document.querySelector("main");

btn.addEventListener("click", function() {
    var x =Math.random() * 100;
    var y =Math.random() * 100;
    var r = Math.floor(Math.random() * 360);
    var c1 = Math.floor(Math.random() * 256);
    var c2 = Math.floor(Math.random() * 256);
    var c3 = Math.floor(Math.random() * 256);
    var div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';
    div.style.backgroundColor = `rgb(${c1}, ${c2}, ${c3})`;
    div.style.left = x + '%';
    div.style.top = y + '%';
    div.style.transform = `rotate(${r}deg)`;
    main.appendChild(div);
})