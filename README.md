1. **Create the QuickActionModalContext**:
   - In `QuickActionModalContext.js`, define a context and provider. Implement state for the modal's open/closed status, mode (create/edit), note data, and onSubmit callback. Add `openModal` and `closeModal` functions and expose them via context.

2. **Build the QuickActionModal component**:
   - In `QuickActionModal.js`, use `useQuickActionModal` to access modal state and controls. Use a `useReducer` for form state (title/body/error), providing local, isolated management and reset. Render a modal overlay only when `open` is true, and display a form for title/body. Validate on submit (title required), call the provided onSubmit callback, handle error feedback, and reset/close on successful submit or cancel.

3. **Provide the Modal Context in Your App**:
   - In `App.js`, wrap your application tree in `<QuickActionModalProvider>`, render `<QuickActionModal />` at the root (so it's always present), and then render the rest of your application.

4. **Trigger Modal Open from Anywhere**:
   - Use the `openModal` function from the context in any component (e.g., header button, body button, edit button in notes list) to open the modal. Pass the appropriate mode (create/edit), note data, and a submit callback which handles the note add/edit logic in the parent (e.g., by updating notes array with setState).

5. **(Demo) Render Sample UI**:
   - Render buttons in header/body which call openModal for creating notes. Render a notes list with edit buttons which call openModal for edit mode. Both use the _same_ modal instance, which manages its own isolated form state and error handling at all times.

6. **Test Behaviors**:
   - Creating or editing a note opens the unified modal, validates required title, resets form on open and close, and does not rely on prop drilling or duplicate logic. Errors for missing fields are shown in-modal, and modal closes on successful submit or cancel.
