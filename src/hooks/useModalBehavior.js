import { useEffect, useRef } from 'react';

// Dialogs that are open right now, most recently opened last. Escape
// closes only the topmost one, so layered modals (e.g. the Curiosity
// Report opened from the stamp collection) don't both dismiss at once.
const openDialogs = [];

// onClose is kept in a ref so the effect only re-runs when isOpen
// changes — a fresh closure each render would otherwise re-run focus.

/**
 * Shared accessible-dialog behavior:
 *  - initial focus moves into the dialog when it opens (first focusable
 *    control, else the dialog container itself), and back to the element
 *    that had focus when it closes;
 *  - Escape closes it. The keydown listener is attached to the dialog
 *    node, so it only fires while that dialog is on screen — correct even
 *    when two modals could overlap.
 *
 * Usage:
 *   const dialogRef = useModalBehavior(isOpen, onClose);
 *   <div ref={dialogRef} className="modal-overlay" role="dialog"
 *        aria-modal="true" aria-label="...">
 */
export function useModalBehavior(isOpen, onClose) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Refreshed every render inside an effect (never during render) so the
  // keydown handler always sees the latest onClose.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return undefined;
    const node = dialogRef.current;
    if (!node) return undefined;

    const previouslyFocused = document.activeElement;

    // Focus the dialog's first focusable descendant (its close button or
    // primary control); fall back to the container.
    const focusables = node.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const target = focusables.length ? focusables[0] : node;
    if (target === node) node.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    // Escape works from anywhere on the page while the dialog is open —
    // a document-level listener catches keys even when focus sits on an
    // element outside the dialog. It only closes the most-recently-opened
    // dialog so layered modals dismiss one at a time.
    const entry = { node, close: () => onCloseRef.current?.() };
    openDialogs.push(entry);

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      const top = openDialogs[openDialogs.length - 1];
      if (top === entry) entry.close();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      const idx = openDialogs.indexOf(entry);
      if (idx !== -1) openDialogs.splice(idx, 1);
      document.removeEventListener('keydown', handleKeyDown);
      node.removeAttribute('tabindex');
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  return dialogRef;
}
