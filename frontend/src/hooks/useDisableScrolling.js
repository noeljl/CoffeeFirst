/* ============================== */
/* Disable Scrolling Hook */
/* ============================== */

// This hook disables scrolling when a modal is open.
// It is used in the FilterModal component.

import { useEffect } from 'react';

export default function useDisableScrolling(isDisabled) {
  useEffect(() => {
    if (isDisabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts or dependencies change
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDisabled]);
}