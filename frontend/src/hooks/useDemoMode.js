import { useEffect, useState } from 'react';
import { getHealth } from '../services/api';

export function useDemoMode() {
  const [demoMode, setDemoMode] = useState(null); // null = unknown/loading
  const [dbConnected, setDbConnected] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    let mounted = true;
    getHealth()
      .then((res) => {
        if (!mounted) return;
        setDemoMode(!!res.data.demoMode);
        setDbConnected(!!res.data.dbConnected);
        setBackendOnline(true);
      })
      .catch(() => {
        if (!mounted) return;
        setBackendOnline(false);
        setDemoMode(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { demoMode, dbConnected, backendOnline };
}
