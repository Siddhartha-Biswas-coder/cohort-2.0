// syantax error -> coding is written wrong

// runtime error -> cannot read properties of undefined values . no error during writing the code but causes error during the runtime

// logical errors -> wrong error . does not show any error
// eg: substraction in addition function
// function add(a, b) {
//   return a-b;
// }

// try and catch
// try{
//     let a = 12;
//     console.log(a.age.name);
// }
// catch(error){
//     console.log(error)
// }

// MessageChannel,name,stack
// try{
//     let a = 12;
//     console.log(a.name.age);
// }catch(err){
//     console.log(err.message);
//     console.log(err.name);
//     console.log(err.stack);
// }

// try,catch and finally
// try{
//     let a = 12;
//     console.log(a.age.name);
// }
// catch(error){
//     console.log(error)
// }
// finally{
//     console.log("hey")
// } //runs in both cases, does not depend on whether there is error or not

//throwing errors in js

// try {
//   let a = 12;
//   console.log(a.age.name);
// } catch (error) {
//   throw new Error("Something went wrong");
// }
