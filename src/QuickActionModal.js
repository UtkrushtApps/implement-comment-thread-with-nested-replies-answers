// The unified modal itself
import React, { useReducer, useEffect } from 'react';
import { useQuickActionModal } from './QuickActionModalContext';

const MODAL_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.38)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const BOX_STYLES = {
  background: '#fff',
  borderRadius: 4,
  padding: 24,
  minWidth: 320,
  boxShadow: '0 2px 16px rgba(0,0,0,0.22)',
};

const INPUT_STYLES = {
  width: '100%',
  padding: '8px 12px',
  marginBottom: 12,
  fontSize: 16,
  border: '1px solid #ddd',
  borderRadius: 3,
};
const BUTTON_STYLES = {
  background: '#007aff',
  color: '#fff',
  border: 'none',
  padding: '10px 18px',
  borderRadius: 3,
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
};
const ERROR_STYLES = {
  color: 'crimson',
  marginBottom: 10,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return {
        title: action.payload?.title || '',
        body: action.payload?.body || '',
        error: '',
      };
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default function QuickActionModal() {
  const { open, mode, note, onSubmit, closeModal } = useQuickActionModal();
  const [form, dispatch] = useReducer(formReducer, {
    title: '',
    body: '',
    error: '',
  });

  // Reset form fields any time modal is opened
  useEffect(() => {
    if (open) {
      dispatch({ type: 'RESET', payload: note });
    }
  }, [open, note]);

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleClose = () => {
    closeModal();
    dispatch({ type: 'RESET' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      dispatch({ type: 'SET_ERROR', error: 'Title is required.' });
      return;
    }
    // Call the submit callback (if any)
    if (typeof onSubmit === 'function') {
      await onSubmit({
        title: form.title.trim(),
        body: form.body,
        id: note?.id,
      });
    }
    handleClose();
  };

  if (!open) return null;
  return (
    <div style={MODAL_STYLES} onClick={handleClose}>
      <div style={BOX_STYLES} onClick={e => e.stopPropagation()}>
        <h2 style={{marginTop:0}}>
          {mode === 'edit' ? 'Edit Note' : 'New Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="note-title" style={{fontWeight:'bold'}}>Title *</label><br />
          <input
            id="note-title"
            name="title"
            style={INPUT_STYLES}
            placeholder="Enter title"
            value={form.title}
            onChange={handleChange}
            autoFocus
          />
          <label htmlFor="note-body" style={{fontWeight:'bold'}}>Body</label><br />
          <textarea
            id="note-body"
            name="body"
            rows={5}
            style={{...INPUT_STYLES, resize:'vertical'}}
            placeholder="Enter note body (optional)"
            value={form.body}
            onChange={handleChange}
          />
          {form.error && <div style={ERROR_STYLES}>{form.error}</div>}
          <div style={{marginTop: 12, display: 'flex', justifyContent:'flex-end'}}>
            <button type="button" onClick={handleClose} style={{...BUTTON_STYLES, background:'#eee', color:'#222', marginRight:10}}>Cancel</button>
            <button type="submit" style={BUTTON_STYLES}>{mode === 'edit' ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
