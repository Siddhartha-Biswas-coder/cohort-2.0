var body = document.body
var h1 = document.querySelector('h1')


body.addEventListener('keydown', function(event) {
    h1.innerHTML = event.code
})