import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import AddNote from './components/note_add';
import Note from './components/note';
import './style.scss';

let noteId = 0;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  addNote = (noteTitle) => {
    noteId += 1;

    // need to disable prefer-const because value will eventually be reassigned
    // eslint-disable-next-line prefer-const
    let noteStarter = {
      title: noteTitle,
      text: '',
      x: 0,
      y: 10,
    };

    this.setState(prevState => ({
      notes: prevState.notes.set(noteId, noteStarter),
    }));
  }

  updateNote = (id, fields) => {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
  }

  deleteNote = (id) => {
    this.setState(prevState => ({
      notes: prevState.notes.delete(id),
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  renderHeader() {
    return (
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
            <Note id={id} note={note} onDelete={this.deleteNote} onUpdate={this.updateNote} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
