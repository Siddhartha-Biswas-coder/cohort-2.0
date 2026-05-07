// promise
// const prm = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve();
//   }, 3000);
// });

// prm
//   //is promise is resolved
//   .then(function () {
//     console.log("resolve");
//   })
//   //is promise is reject
//   .catch(function () {
//     console.log("reject");
//   });

// fetch is used to bring data from any url
// the fetched data is not reable
// it is then converted to json so that it can readable

// async await (works on promise)

// let prm  = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve();
//     }, 3000);
// });

// fetch(`https://randomuser.me/api/`)
//   .then(function (notReadableData) {
//     return notReadableData.json();
//   })
//   .then(function (realData) {
//     console.log(realData.results[0].name.first);
//   });

// fetch(`https://randomuer.me/api/`)
//   .then((raw) => raw.json())
//   .then((data) => {
//     console.log(data.results[0].name.first);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async function abcd() {
//   let raw = await fetch(`https://randomuer.me/api/`);
//   let data = await raw.json();
//   console.log(data);
// }

// abcd();

// function getNum() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let num = Math.floor(Math.random() * 10);
//       if (num < 5) {
//         resolve(true);
//       } else {
//         reject(false);
//       }
//     }, 3000);
//   });
// }

// async function abcd() {
//   let v = await getNum();
//   console.log(v)
// }

// abcd();

//async before a function means the function will return a promise
// await only works inside a async function
