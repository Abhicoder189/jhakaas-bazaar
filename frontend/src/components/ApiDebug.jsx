import { useEffect, useState } from 'react';

const ApiDebug = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo({
      VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'NOT SET',
      mode: import.meta.env.MODE,
      constructedBase: import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
        : '/api',
    });
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'black', 
      color: 'lime',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '400px',
      fontFamily: 'monospace'
    }}>
      <div><strong>API Config Debug:</strong></div>
      <div>VITE_API_BASE_URL: {info.VITE_API_BASE_URL}</div>
      <div>Mode: {info.mode}</div>
      <div>API calls go to: {info.constructedBase}</div>
    </div>
  );
};

export default ApiDebug;