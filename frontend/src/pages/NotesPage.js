import React from 'react';
import '../styles/NotesPage.css'; // Importa el archivo de estilos CSS

class NotesPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>NotesApp</h1>
          <div className="dropdown">
            <button onClick={this.toggleDropdown} className="dropbtn">Menu</button>
            <div id="myDropdown" className="dropdown-content">
              <a href="#">Users</a>
              <a href="#">Friends</a>
            </div>
          </div>
        </header>
        <div id="board">
          <div id="default-collection">
            <h2>Other</h2>
          </div>
        </div>
        <div id="add-note" className="floating-button" onClick={this.showNoteForm}>
          +
          <div className="tooltip">Add Note</div>
        </div>
        <div id="note-form" className="hidden">
          <input type="text" id="note-title" placeholder="Title" />
          <input type="text" id="note-content" placeholder="Content" />
          <input type="date" id="note-date" />
          <textarea id="note-details" placeholder="Details"></textarea>
          <select id="note-color">
            <option value="#ffe4b5">Pastel Yellow</option>
            <option value="#add8e6">Pastel Blue</option>
            <option value="#98fb98">Pastel Green</option>
            <option value="#ffc0cb">Pastel Pink</option>
          </select>
          <select id="note-collection">
            <option value="default">Select Collection</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            {/* Add more collections as needed */}
          </select>
          <button onClick={this.addNote}>Add Note</button>
          <button onClick={this.hideNoteForm}>Cancel</button>
        </div>
      </div>
    );
  }

  showNoteForm() {
    document.getElementById("note-form").style.display = "block";
  }

  hideNoteForm() {
    document.getElementById("note-form").style.display = "none";
  }

  addNote() {
    var title = document.getElementById("note-title").value;
    var content = document.getElementById("note-content").value;
    var date = document.getElementById("note-date").value;
    var details = document.getElementById("note-details").value;
    var color = document.getElementById("note-color").value;
    var collection = document.getElementById("note-collection").value;

    var note = document.createElement("div");
    note.classList.add("note");
    note.style.backgroundColor = color;

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() {
      note.remove();
    };

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = function() {
      // Implementar la función de editar aquí
      alert("Editando nota...");
    };

    var shareButton = document.createElement("button");
    shareButton.innerText = "Share";
    shareButton.onclick = function() {
      // Implementar la función de compartir aquí
      alert("Compartiendo nota...");
    };

    var noteContent = document.createElement("div");
    noteContent.innerHTML = "<h2>" + title + "</h2>" + "<p>" + content + "</p>" + "<p>Date: " + date + "</p>" + "<p>Details: " + details + "</p>";

    note.appendChild(deleteButton);
    note.appendChild(editButton);
    note.appendChild(shareButton);
    note.appendChild(noteContent);

    if (collection === "default") {
      var defaultCollection = document.getElementById("default-collection");
      if (!defaultCollection) {
        defaultCollection = document.createElement("div");
        defaultCollection.id = "default-collection";
        defaultCollection.innerHTML = "<h2>Other</h2>";
        document.getElementById("board").appendChild(defaultCollection);
      }
      defaultCollection.appendChild(note);
    } else {
      var collectionDiv = document.getElementById(collection);
      if (!collectionDiv) {
        collectionDiv = document.createElement("div");
        collectionDiv.id = collection;
        collectionDiv.innerHTML = "<h2>" + collection + "</h2>";
        document.getElementById("board").appendChild(collectionDiv);
      }
      collectionDiv.appendChild(note);
    }

    this.hideNoteForm();
  }

  toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
}

export default NotesPage;
