import React from 'react';

const LoadingSpinner = ({ darkTheme }) => (
  <div className={`flex items-center justify-center min-h-screen ${darkTheme !== false ? 'bg-[#020617]' : 'bg-slate-50'}`}>
    <div className="relative w-14 h-14">
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
        style={{
          borderTopColor: '#7c3aed',
          borderRightColor: '#06b6d4',
          animationDuration: '0.8s'
        }}
      />
      <div
        className="absolute inset-2 rounded-full border-4 border-transparent animate-spin"
        style={{
          borderTopColor: '#6366f1',
          borderRightColor: '#10b981',
          animationDuration: '1.2s',
          animationDirection: 'reverse'
        }}
      />
    </div>
  </div>
);

export default LoadingSpinner;
