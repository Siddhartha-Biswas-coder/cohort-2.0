// const para = document.querySelector("p")
// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
// const text = para.innerText

// let iteration = 0
// let interval;

// function randomText (){
//     const str = text.split('').map((char,index)=>{

//             if (index < iteration){
//                 return char
//             }
//             return characters[Math.floor(Math.random()*characters.length)]
//         }).join('')

//         para.innerText = str
//         iteration += 1

//         if(iteration > text.length){
//             clearInterval(interval)
//         }
// }

// para.addEventListener('mouseenter',function(){

//     iteration = 0;
//     clearInterval(interval);

//     interval = setInterval(randomText,30)
// })

const para = document.querySelector("p");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const text = para.innerText;

let iteration = 0;
let interval;

function randomText() {
  clearInterval(interval);

  interval = setInterval(() => {
    para.innerText = text
      .split("")
      .map((char, index) => {
        if (index < iteration) {
          return text[index];
        }

        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");

    iteration += 0.2;

    if (iteration > text.length) {
      clearInterval(interval);
    }
  }, 30);
}

para.addEventListener("mouseenter", randomText);
