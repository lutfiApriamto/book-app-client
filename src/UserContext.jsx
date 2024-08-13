import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false)

  useEffect(() => {
    axios.get('/profile')
      .then(({ data }) => {
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
        setReady(true);  // Set ready ke true setelah proses selesai
      })
      .catch(err => {
        console.error('Failed to fetch user profile:', err);
        setUser(null);
        setReady(true);  // Pastikan ready di-set true meskipun terjadi error
      });
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
