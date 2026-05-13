import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function fetchNotes() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function createNotes(title, description) {
    axios
      .post("http://localhost:3000/api/notes", {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);

        fetchNotes();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function handleDeleteNote(noteID) {
    axios
      .delete("http://localhost:3000/api/notes/" + noteID)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createNotes(title, description);

    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
