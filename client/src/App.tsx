import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GlobalContextProvider } from './context/GlobalContextProvider';
import { BoxCookies } from '@components/Partials/BoxCookies';
import Modals from '@components/Modals';
import { UserContextProvider } from '@context/UserContextProvider';
import { Routes } from './routes/Routes';

function App() {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes />
          <BoxCookies />
          <Modals />
          <ToasterComponent />
        </BrowserRouter>
      </UserContextProvider>
    </GlobalContextProvider>
  );
}

function ToasterComponent() {
  return (
    <Toaster
      toastOptions={{
        className: 'bg-zinc-500 text-white',
        style: {
          zIndex: 999999,
        },
      }}
    />
  );
}

export default App;
