import { useUserContext } from '@context/UserContextProvider';
import PageNotFound from '@pages/404';
import { Chat } from '@pages/Chat';
import { FormExample } from '@pages/Form';
import { RegisterAndLoginForm } from '@pages/RegisterAndLoginForm';
import React, { useEffect } from 'react';
import {
  Routes as Routing,
  Route,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';

export function Routes() {
  const { username } = useUserContext();
  const navigate = useNavigate(); // navigate('/')

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username]);

  return (
    <Routing>
      {/* remove this route to start */}
      <Route path="/" element={<RegisterAndLoginForm />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<PageNotFound />} />
    </Routing>
  );
}
