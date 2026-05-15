import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteNo, setNoteNo] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  function fetchNotes() {
    axios
      .get("https://cohort-2-0-8hp8.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function createNotes(title, description) {
    axios
      .post("https://cohort-2-0-8hp8.onrender.com/api/notes", {
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
      .delete("https://cohort-2-0-8hp8.onrender.com/api/notes/" + noteID)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  function updateNote(noteID, updateTitle, updateDescription) {
    const data = {};

    if (updateTitle) {
      data.title = updateTitle;
    }

    if (updateDescription) {
      data.description = updateDescription;
    }

    axios
      .patch("https://cohort-2-0-8hp8.onrender.com/api/notes/" + noteID, data)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    console.log(noteID, updateTitle, updateDescription);
  }

  function handleUpdateNote(e) {
    e.preventDefault();

    const selectedNote = notes[Number(noteNo) - 1];

    if (!selectedNote) {
      alert("Invalid Note Number");
      return;
    }

    updateNote(selectedNote._id, updateTitle, updateDescription);

    setNoteNo("");
    setUpdateTitle("");
    setUpdateDescription("");
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

      <form className="note-update-form" onSubmit={handleUpdateNote}>
        <input
          name="Note"
          type="text"
          placeholder="Note No."
          value={noteNo}
          onChange={(e) => {
            setNoteNo(e.target.value);
          }}
        />
        <input
          name="updateTitle"
          type="text"
          placeholder="Update title"
          value={updateTitle}
          onChange={(e) => {
            setUpdateTitle(e.target.value);
          }}
        />
        <input
          name="updateDescription"
          type="text"
          placeholder="Update description"
          value={updateDescription}
          onChange={(e) => {
            setUpdateDescription(e.target.value);
          }}
        />
        <button>Update Note</button>
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
