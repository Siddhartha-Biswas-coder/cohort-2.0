const para = document.querySelector("p")
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const text = para.innerText

para.addEventListener('mouseenter',function(){

    setInterval(()=> {
        
        const str = text.split('').map((char,index)=>{
            return characters[Math.floor(Math.random()*characters.length)]
        }).join('')

        para.innerText = str

    },30)
})