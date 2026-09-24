import React, { useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleLoginButton({ theme = 'outline', size = 'medium' }) {
  const { loginWithGoogleCredential } = useUser();
  const divRef = useRef(null);

  useEffect(() => {
    if (!CLIENT_ID || !divRef.current) return;

    function render() {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => loginWithGoogleCredential(response.credential),
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme,
        size,
        type: 'standard',
        shape: 'pill',
        text: 'signin_with',
      });
    }

    if (window.google?.accounts?.id) {
      render();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          render();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loginWithGoogleCredential, theme, size]);

  if (!CLIENT_ID) return null;

  return <div ref={divRef} />;
}
