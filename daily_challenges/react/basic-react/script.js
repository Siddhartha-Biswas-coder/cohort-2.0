import box from "./app.js";

var h1 = React.createElement("h1", null, "Hey I am Siddhartha ");

var h2 = React.createElement("h2", null, "I am from Madhyamgram.");

var div = React.createElement("div", { id: "parent" }, [h1, box(), h2]);

var container = document.querySelector("#container");

var root = ReactDOM.createRoot(container);
root.render(div);
