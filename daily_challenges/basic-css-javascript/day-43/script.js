var btn = document.querySelector('button')
var h1 = document.querySelector('h1')
var main = document.querySelector('main')

// btn.addEventListener('click', function() {
//   var c1 = Math.floor(Math.random() * 256);
//   var c2 = Math.floor(Math.random() * 256);
//   var c3 = Math.floor(Math.random() * 256);
//   var name = ['Siddhartha','Sam','Sophie','Sonia','Sanjay','soham','Uday'];
//   var randomName = name[Math.floor(Math.random() * name.length)];
//   var rgb = `rgb(${c1}, ${c2}, ${c3})`;
//   box.style.backgroundColor = rgb;
//   p.textContent = `${randomName}: ${rgb}`
// })

var ipl = [
    {
        name : 'RCB',
        primary: 'red',
        secondary: 'black'
    },
    {
        name : 'CSK',
        primary : 'yellow',
        secondary : 'blue'
    },
    {
        name : 'MI',
        primary : 'blue',
        secondary : 'silver'
    },
    {
        name : 'KKR',
        primary : 'purple',
        secondary : 'gold'
    },
    {
        name : 'SRH',
        primary : 'orange',
        secondary : 'darkred'
    },
]

btn.addEventListener('click', function() {
  var randomTeam = ipl[Math.floor(Math.random() * ipl.length)];
  
  h1.style.backgroundColor = randomTeam.secondary;
  main.style.backgroundColor = randomTeam.primary;
  h1.textContent = `${randomTeam.name}`
})


