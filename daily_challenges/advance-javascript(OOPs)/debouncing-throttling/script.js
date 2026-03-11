// function debounce(fn, delay) {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(fn, delay);
//   };
// }

// document.querySelector("#search").addEventListener(
//   "input",
//   debounce(function () {
//     console.log("chala");
//   }, 400),
// );


function throttle(fn,delay){
    let last = 0;
    return function(){
        const now = Date.now();
        if(now - last >= delay){
            last = now;
            fn();
        }
    }
}

window.addEventListener("mousemove",throttle(function(e){
    console.log('sid')
},2000))