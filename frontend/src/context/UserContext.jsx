import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const DEFAULT_USER = {
  name: 'Shaik Shafi',
  rollNumber: '92410133016',
  batch: '7EK2',
  email: 'shaikshafi6288@gmail.com',
  learningLevel: 'Intermediate',
  picture: null,
  authenticated: false,
};

function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {}
  }, [user]);

  function loginWithGoogleCredential(credential) {
    const payload = decodeJwt(credential);
    if (!payload) return;
    setUser((prev) => ({
      ...prev,
      name: payload.name || prev.name,
      email: payload.email || prev.email,
      picture: payload.picture || null,
      authenticated: true,
    }));
  }

  function logout() {
    setUser((prev) => ({ ...DEFAULT_USER, name: prev.name, rollNumber: prev.rollNumber, batch: prev.batch }));
    try {
      window.google?.accounts?.id?.disableAutoSelect?.();
    } catch {}
  }

  return (
    <UserContext.Provider value={{ user, setUser, loginWithGoogleCredential, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
