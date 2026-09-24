import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const DEFAULT_USER = {
  name: 'Shaik Shafi',
  rollNumber: '92410133016',
  batch: '7EK2',
  email: 'shaikshafi6288@gmail.com',
  learningLevel: 'Intermediate',
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {}
  }, [user]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
