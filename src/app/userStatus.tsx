// UserStatusContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type UserStatusContextType = {
  userActive: boolean;
  uid: string | null;
  setUserActive: (active: boolean, uid?: string | null) => void;
};

const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

export const UserStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userActive, setUserActiveState] = useState(false);
  const [uid, setUid] = useState<string | null>(null);

  const setUserActive = (active: boolean, uid?: string | null) => {
    setUserActiveState(active);
    setUid(uid || null);
  };

  return (
    <UserStatusContext.Provider value={{ userActive, uid, setUserActive }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export const useUserStatus = () => {
  const context = useContext(UserStatusContext);
  if (!context) {
    throw new Error('useUserStatus must be used within a UserStatusProvider');
  }
  return context;
};
