const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

/* 
POST -> creation of API .... /notes
*/
app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  console.log(notes);

  res.status(201).json({
    message: "Note created successfully",
  });

  // res.send("note created");
});

/* 
GET -> getting the API .... /notes
*/
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

/* 
DELETE -> delete a note from the notes  /notes/:index
*/
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

/*
PATCH -> partially update the notes  /notes/:index
*/
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;

  res.status(200).json({
    message: "Note updated successfully",
  });
});

module.exports = app;
