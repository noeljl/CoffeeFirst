import React, { useEffect } from 'react';
import './Snackbar.css';

export default function Snackbar({ open, message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  return open ? (
    <div className="snackbar">
      <span className="snackbar-icon">✔️</span>
      <span>{message}</span>
      <button className="snackbar-close" onClick={onClose}>×</button>
    </div>
  ) : null;
}
