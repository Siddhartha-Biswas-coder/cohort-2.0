var body = document.body
var h1 = document.querySelector('h1')
var audio1 = new Audio('./sounds/28.mp3')
var audio2 = new Audio('./sounds/29.mp3')
var audio3 = new Audio('./sounds/30.mp3')
var audio4 = new Audio('./sounds/31.mp3')
var audio5 = new Audio('./sounds/32.mp3')
var audio6 = new Audio('./sounds/33.mp3')
var audio7 = new Audio('./sounds/34.mp3')
var audio8 = new Audio('./sounds/35.mp3')
var audio9 = new Audio('./sounds/36.mp3')
var audio10 = new Audio('./sounds/37.mp3')


body.addEventListener('keydown', function(event) {
    h1.innerHTML = event.code
    if (event.code === 'Digit1') {
        audio1.play()
    } else if (event.code === 'Digit2') {
        audio2.play()
    } else if (event.code === 'Digit3') {
        audio3.play()
    } else if (event.code === 'Digit4') {
        audio4.play()
    } else if (event.code === 'Digit5') {
        audio5.play()
    } else if (event.code === 'Digit6') {
        audio6.play()
    } else if (event.code === 'Digit7') {
        audio7.play()
    } else if (event.code === 'Digit8') {
        audio8.play()
    } else if (event.code === 'Digit9') {
        audio9.play()
    } else if (event.code === 'Digit0') {
        audio10.play()
    }
})