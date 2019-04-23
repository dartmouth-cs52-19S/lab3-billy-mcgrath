import firebase from 'firebase';

// Initialize Firebase
// eslint-disable-next-line no-var
var config = {
  apiKey: 'AIzaSyBlIRxxSHP_pm1mXZNUteYoG1ZtfTAiJTc',
  authDomain: 'react-notes-f6e8c.firebaseapp.com',
  databaseURL: 'https://react-notes-f6e8c.firebaseio.com',
  projectId: 'react-notes-f6e8c',
  storageBucket: 'react-notes-f6e8c.appspot.com',
  messagingSenderId: '638247933509',
};
firebase.initializeApp(config);
// Get a reference to the database service
const database = firebase.database();

// eslint-disable-next-line import/prefer-default-export
export function fetchNotes(callback) {
  // do something with new note state
  database.ref('notes').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function addNote(newNote) {
  database.ref('notes').push(newNote);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function updateNote(id, fields) {
  database.ref('notes').child(id).update(fields);
}
