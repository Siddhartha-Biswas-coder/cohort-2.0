const express = require("express");

const app = express(); /* creation of server */

app.use(express.json());

const notes = [
  //   {
  //     title: "test title 1",
  //     description: "test description 1",
  //   },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

/* 
POST / notes
*/

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);

  console.log(notes);

  res.send("note created");
});

/* 
GET / notes
*/

app.get("/notes", (req, res) => {
  res.send(notes);
});

/* 
DELETE / notes/:index
params
*/

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.send("note deleted successfully");
});

/* 
PATCH / notes/:index
req.body = {description :- "sample modified description"}
*/

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.send("Note updated successfully");
});

module.exports = app;

/* 

creation of server and configuration of server

*/
