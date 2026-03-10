const users = [
  "siddharthabiswas2024@gmail.com",
  "sohamsen2005@gmail.com",
  "satwik@gmail.com",
];

function sendEmail(email) {
  return new Promise((resolve, reject) => {
    let time = Math.floor(Math.random() * 5);

    setTimeout(() => {
      let probabilty = Math.floor(Math.random() * 10);
      if (probabilty <= 5) {
        resolve("Email successfully send");
      } else {
        reject("Email not send");
      }
    }, time * 1000);
  });
}

// sendEmail("sid@mail.com")
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

async function sendEmails(userList) {
  let allresponses = userList.map(function (email) {
    return sendEmail(email)
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return err;
      });
  });

  let ans = await Promise.all(allresponses);
  ans.forEach(function(status){
    console.log(status)
  })
}

sendEmails(users);
