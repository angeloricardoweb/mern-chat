import { api } from '@services/axios';
import userStore from '@stores/userStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
export function RegisterAndLoginForm() {
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate(); // navigate('/')
  const [tipeForm, setTipeForm] = React.useState('login'); // login or register

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nickname || !password) {
      return;
    }
    const url = tipeForm === 'login' ? '/login' : '/register';
    try {
      const response = await api.post(url, {
        username: nickname,
        password,
      });

      navigate('/contato');
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-blue-50">
      <h1 className="text-xl font-bold flex items-center gap-1">
        <Icon icon="mdi:chat-processing"/>
        MERN CHAT
      </h1>
      <form className="my-5 w-64" onSubmit={register}>
        <input
          type="text"
          className="mb-2 block w-full rounded-md border p-2"
          placeholder="email"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          className="mb-2 block w-full rounded-md border p-2"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded-md border bg-blue-400 p-2 text-white hover:bg-blue-500 active:bg-blue-700">
          {tipeForm === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      {tipeForm === 'login' ? (
        <div>
          Don't a Member?{' '}
          <button
            onClick={() => {
              setTipeForm('register');
            }}
          >
            Register Here
          </button>
        </div>
      ) : (
        <div>
          Already a Member?{' '}
          <button
            onClick={() => {
              setTipeForm('login');
            }}
          >
            Login Here
          </button>
        </div>
      )}
    </div>
  );
}
