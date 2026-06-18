import React, { createContext, useContext, useState, useEffect } from 'react';

interface GestureContextType {
  isGestureEnabled: boolean;
  toggleGestures: () => void;
  turnOffGestures: () => void;
}

const GestureContext = createContext<GestureContextType | undefined>(undefined);

export function GestureProvider({ children }: { children: React.ReactNode }) {
  // Check local storage for persistent preference
  const [isGestureEnabled, setIsGestureEnabled] = useState(() => {
    const stored = localStorage.getItem('endv_gestures');
    return stored ? JSON.parse(stored) : false;
  });

  const toggleGestures = () => {
    setIsGestureEnabled((prev: boolean) => {
      const newState = !prev;
      localStorage.setItem('endv_gestures', JSON.stringify(newState));
      return newState;
    });
  };

  const turnOffGestures = () => {
    setIsGestureEnabled(false);
    localStorage.setItem('endv_gestures', JSON.stringify(false));
  };

  return (
    <GestureContext.Provider value={{ isGestureEnabled, toggleGestures, turnOffGestures }}>
      {children}
    </GestureContext.Provider>
  );
}

export function useGesture() {
  const context = useContext(GestureContext);
  if (context === undefined) {
    throw new Error('useGesture must be used within a GestureProvider');
  }
  return context;
}
