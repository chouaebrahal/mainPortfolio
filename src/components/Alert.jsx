
import { useEffect, useRef } from 'react';

const Alert = ({text, type}) => {
  const alertRef = useRef(null);

  useEffect(() => {
    // Focus the alert when it appears for screen reader users
    if (alertRef.current) {
      alertRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={alertRef}
      role="alert"
      aria-live="assertive"
      className={`fixed top-30 left-1/2 -translate-x-1/2 ${type === 'success' ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-2xl shadow-lg z-5000`}
      tabIndex={-1} // Make it focusable for screen readers
    >
         {text}
    </div>
  )
}

export default Alert