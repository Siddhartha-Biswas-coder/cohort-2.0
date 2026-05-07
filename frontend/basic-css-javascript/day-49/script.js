// var allElement = document.querySelectorAll('.elem')

// allElement.forEach(function(elem){
//     elem.childNodes[3].addEventListener('click',function(){
        
//     })
// })

var allBtn = document.querySelectorAll('button')

allBtn.forEach(function(elem){
    elem.addEventListener('click',function(){
        if (elem.innerHTML == 'Add Friend'){
            elem.innerHTML = 'Remove'
        }else{
            elem.innerHTML = 'Add Friend'
        }
    })
})