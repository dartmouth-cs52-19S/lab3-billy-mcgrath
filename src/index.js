import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import AddNote from './components/note_add';
import Note from './components/note';
import './style.scss';
import * as db from './services/datastore';

// const noteId = 0;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  addNote = (noteTitle) => {
    // noteId += 1;

    // need to disable prefer-const because value will eventually be reassigned
    // eslint-disable-next-line prefer-const
    let noteStarter = {
      title: noteTitle,
      text: '',
      x: 0,
      y: 10,
    };

    db.addNote(noteStarter);
  }

  updateNote = (id, fields) => {
    db.updateNote(id, fields);
  }

  deleteNote = (id) => {
    db.deleteNote(id);
  }

  // eslint-disable-next-line class-methods-use-this
  renderHeader() {
    return (
      // eslint-disable-next-line react/no-unescaped-entities
      <h1>Billy's Notes App</h1>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <AddNote onSubmit={this.addNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} key={id} note={note} onDelete={this.deleteNote} onUpdate={this.updateNote} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
