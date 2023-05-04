import { api } from '@services/axios';
import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from 'react';

type ContextData = {
  username: string;
  setUsername: (username: string) => void;
  id: string;
  setId: (id: string) => void;
};

export const UserContext = createContext<ContextData>({} as ContextData);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState('exists');
  const [id, setId] = useState('');

  const data = {
    username,
    setUsername,
    id,
    setId,
  };

  async function getUser() {
    try {
      const response = await api.get('/profile');
      setUsername(response.data.username);
      setId(response.data.id);
    } catch (error) {
      setUsername('');
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  return useContext(UserContext);
};
