import { useState, useEffect } from 'react';

/**
 * Custom hook to load Midtrans Snap script dynamically
 * @returns {Object} { snapLoaded, snapError }
 */
export const useMidtransSnap = () => {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [snapError, setSnapError] = useState(null);

  useEffect(() => {
    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    const snapScriptUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js';

    if (!midtransClientKey) {
      const error = 'Midtrans client key is not configured';
      console.error(error);
      setSnapError(error);
      return;
    }

    // Check if script is already loaded
    if (window.snap) {
      setSnapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = snapScriptUrl;
    script.setAttribute('data-client-key', midtransClientKey);
    
    script.onload = () => {
      setSnapLoaded(true);
      console.log('Midtrans Snap loaded successfully');
    };
    
    script.onerror = () => {
      const error = 'Failed to load Midtrans Snap script';
      console.error(error);
      setSnapError(error);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { snapLoaded, snapError };
};
