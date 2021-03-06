import React, { Component } from 'react';

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreateNote = this.onCreateNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onCreateNote() {
    // The onSubmit line was copied from Avery Vanacore
    this.props.onSubmit(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <form id="note-add">
        <input id="input-bar" type="text" onChange={this.onInputChange} placeholder="new note title" value={this.state.title} />
        <button id="submit-button" type="button" onClick={this.onCreateNote}>Create a note!</button>
      </form>
    );
  }
}


export default AddNote;
