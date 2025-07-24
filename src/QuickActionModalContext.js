// Context and provider for the global QuickActionModal
import React, { createContext, useContext, useState, useCallback } from 'react';

const QuickActionModalContext = createContext();

export const QuickActionModalProvider = ({ children }) => {
  // modalState => { open: boolean, mode: 'create'|'edit', note: {id, title, body}, onSubmit: fn } 
  const [modalState, setModalState] = useState({ open: false });

  const openModal = useCallback(({ mode = 'create', note = null, onSubmit = null }) => {
    setModalState({ open: true, mode, note, onSubmit });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ open: false });
  }, []);

  return (
    <QuickActionModalContext.Provider value={{
      ...modalState,
      openModal,
      closeModal,
    }}>
      {children}
    </QuickActionModalContext.Provider>
  );
};

export const useQuickActionModal = () => useContext(QuickActionModalContext);