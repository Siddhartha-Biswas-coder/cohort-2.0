var img = document.querySelector('.card #image1');
var love = document.querySelector('.card #love')

img.addEventListener('dblclick', function() {
    love.style.opacity = 0.9;
    love.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';

    setTimeout(() => {
        love.style.transform = 'translate(-50%, -300%) scale(0) rotate(-60deg)';
    }, 800)
    setTimeout(() => {
        love.style.opacity = 0;
    }, 1000)
    setTimeout(() => {
        love.style.transform = 'translate(-50%, -50%) scale(0) rotate(-60deg)';
    },1200)
});