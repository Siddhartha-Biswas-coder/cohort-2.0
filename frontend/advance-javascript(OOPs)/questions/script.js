// question1
// function afterDelay(time, cb) {
//   setTimeout(function () {
//     cb();
//   }, time);
// }

// afterDelay(3000, function () {
//   console.log("callback executed");
// });

//question2
// function getUser(username, cd) {
//   setTimeout(function () {
//     cd({ id: 1, username: "Siddhartha"});
//   }, 1000);
// }

// function getUserPosts(id,cd){
//     setTimeout(function(){
//         cd(["post1","post2","post3"]);
//     },1000);
// }

// getUser("Siddhartha", function (obj) {
//     getUserPosts(obj.id,function(allposts){
//          console.log(obj.username);
//          console.log(allposts)
//     })
// });

//question3
// function loginUser(cb){
//     setTimeout(function(){
//         cb({id:1,name:"Siddhartha"})
//     },1000);
// }

// function fetchPermissions(userId){
//     setTimeout(function(){
//         console.log("Dashboard loaded...")
//     },1000)
// }

// function flow(){
//     loginUser(fetchPermissions())
// }

function loginUser(username,cb){
    setTimeout(() => {
        cb({id: 1212 , username: username})
    },1000);
}
function fetchPermissions(id,cb){
    setTimeout(() => {
        cb(["read","write","delete"])
    },2000);
}
function loadDashboard(permissions,cb){
    setTimeout(() => {
        cb();
    },2000)
}

loginUser("Sid",function(userData){
    fetchPermissions(userData.id, function(permissions){
        loadDashboard(permissions,function(){
            console.log("permission loaded")
        })
    })
})