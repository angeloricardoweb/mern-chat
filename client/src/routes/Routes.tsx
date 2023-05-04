import { useUserContext } from '@context/UserContextProvider';
import PageNotFound from '@pages/404';
import { FormExample } from '@pages/Form';
import { Register } from '@pages/Register';
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
      <Route path="/" element={<Register />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/contato" element={<FormExample />} />
      <Route path="*" element={<PageNotFound />} />
    </Routing>
  );
}
