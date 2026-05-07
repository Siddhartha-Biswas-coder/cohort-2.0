// function getWeather(city) {
//   let apikey = "b92e57938eaebc6ded1fcf3a2f5b4bc3";

//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`,
//   )
//     .then((raw) => raw.json())
//     .then((result) => {
//       console.log(result);
//     });
// }

getWeather("Darregueira");

// async function getWeather(city) {
//   try {
//     let apikey = "b92e57938eaebc6ded1fcf3a2f5b4bc3";

//     let raw = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`,
//     );
//     let realData = await raw.json();
//     console.log(realData);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

async function getWeather(city) {
  try {
    let apikey = "b92e57938eaebc6ded1fcf3a2f5b4bc3";

    let raw = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
    );

    if (!raw.ok) {
      throw new Error("City not found, try something else.");
    }
    let realData = await raw.json();
    if (realData.main.temp < 0) {
      console.warn(`To Cold out there... ${realData.main.temp}°C`);
    } else if (realData.main.temp > 40) {
      console.warn(`Too hot out there... ${realData.main.temp}°C`);
    } else {
      console.log(realData);
    }
  } catch (err) {
    console.log(err.message);
  }
}
