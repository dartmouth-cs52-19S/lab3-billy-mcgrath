import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      isEditing: false,
    };

    this.renderTitle = this.renderTitle.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  // Delete method copied from Avery Vanacore
  onDeleteClick = (event) => {
    this.props.onDelete(this.props.id);
  }

  onEditClick = (event) => {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  onDrag(e, ui) {
    this.props.onUpdate(this.props.id, { x: ui.x, y: ui.y });
  }

  onTitleChange(event) {
    this.props.onUpdate(this.props.id, { title: event.target.value });
  }

  onTextChange(event) {
    this.props.onUpdate(this.props.id, { text: event.target.value });
  }

  renderTitle() {
    if (this.state.isEditing) {
      return (
        <input id="title-change" type="text" onChange={this.onTitleChange} value={this.props.note.title} />
      );
    } else {
      return (
        <div className="note-title">{this.props.note.title}</div>
      );
    }
  }

  renderDelete() {
    return (
      <button type="button" onClick={this.onDeleteClick} className="note-button"><i className="far fa-trash-alt" /></button>
    );
  }

  renderEdit() {
    return (
      <button type="button" onClick={this.onEditClick} className="note-button"><i className="far fa-edit" /></button>
    );
  }

  renderDrag() {
    return (
      <button type="button" onClick={this.onDrag} className="note-button drag"><i className="fas fa-arrows-alt" /></button>
    );
  }

  renderText() {
    if (this.state.isEditing) {
      return (
        <input id="text-change" type="text" onChange={this.onTextChange} value={this.props.note.text} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div className="note-body" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".drag"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div className="note-top">
            {this.renderTitle()}
            <div className="buttons">
              {this.renderEdit()}
              {this.renderDelete()}
              {this.renderDrag()}
            </div>
          </div>
          {this.renderText()}
        </div>
      </Draggable>
    );
  }
}


export default Note;
