// callback -> a function which will not run immediately , it will run when a certain task is completed

// example
// setTimeout(function(){
//     console.log("hey");
// },2000)

// getDataFromInstagram("username",function(){})

//callback is also a function which is passed to any other function

// function abcd(fn){
//    fn(function(fn2){
//         fn2(function(){
//             console.log('hey')
//          });
//     });
// }

// abcd(function(fn){
//     fn(function(fn3){
//         fn3();
//     });
// });


//pass a function when a function is called , and the called function should accept it
// function abcd(fn){
//     fn(function(fn3){
//         fn3(function(fn5){
//             fn5(function(){
//                 console.log('hey');
//             })
//         });
//     });
// }

// abcd(function(fn2){
//     fn2(function(fn4){
//         fn4(function(fun6){
//             fun6();
//         });
//     });
// });

// function bringDetails(address,cb){
//     console.log("fetching details...")
//     setTimeout(()=>{
//         cb({lat:23.36, lng:76.5});
//     },3000)
// }

// bringDetails("madhyamgram",function(details){
//     console.log(details);
// })