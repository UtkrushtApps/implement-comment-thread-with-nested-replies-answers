import React, { useState } from 'react';
import { QuickActionModalProvider, useQuickActionModal } from './QuickActionModalContext';
import QuickActionModal from './QuickActionModal';

// Demo: Notes data and edit/create logic
function NotesList({ notes, onEdit }) {
  return (
    <ul style={{listStyle:'none', padding:0}}>
      {notes.map(note => (
        <li key={note.id} style={{border: '1px solid #eee', borderRadius:4, marginBottom:12, padding:12}}>
          <div style={{fontWeight:'bold', fontSize:18}}>{note.title}</div>
          <div style={{fontStyle:'italic', color:'#666', marginBottom:5, marginTop:4}}>{note.body}</div>
          <button onClick={() => onEdit(note)} style={{padding:'6px 12px', fontSize:15, borderRadius:3, border:'1px solid #ddd', background:'#f5f5f5', cursor:'pointer'}}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

function HeaderCreateNoteButton({ onOpen }) {
  return (
    <button onClick={onOpen} style={{padding:'10px 18px', background:'#007aff', color:'#fff', border:'none', fontWeight:'bold', borderRadius:3, fontSize:17, cursor:'pointer'}}>+ New Note (Header)</button>
  );
}
function BodyCreateNoteButton({ onOpen }) {
  return (
    <button onClick={onOpen} style={{padding:'10px 18px', background:'#14a114', color:'#fff', border:'none', fontWeight:'bold', borderRadius:3, fontSize:17, cursor:'pointer'}}>+ Add Note (Body)</button>
  );
}

function MainContent() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'First note', body: 'Quick modal demo.' },
    { id: 2, title: 'Second note', body: 'Edit and triggers.' }
  ]);
  const { openModal } = useQuickActionModal();

  // Open modal to create new note
  const handleCreate = () => {
    openModal({
      mode: 'create',
      note: null,
      onSubmit: (note) => {
        setNotes(cur => [
          ...cur, 
          { ...note, id: Date.now() }
        ]);
      },
    });
  };

  // Open modal to edit a note
  const handleEdit = (note) => {
    openModal({
      mode: 'edit',
      note,
      onSubmit: (update) => {
        setNotes(cur => cur.map(n => n.id === update.id ? { ...n, ...update } : n));
      },
    });
  };

  return (
    <div style={{padding:40, maxWidth:700, margin:'auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:14}}>
        <HeaderCreateNoteButton onOpen={handleCreate} />
      </div>
      <h1>Notes</h1>
      <NotesList notes={notes} onEdit={handleEdit} />
      <div style={{marginTop:40}}>
        <BodyCreateNoteButton onOpen={handleCreate} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QuickActionModalProvider>
      <QuickActionModal />
      <MainContent />
    </QuickActionModalProvider>
  );
}
