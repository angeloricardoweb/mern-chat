import { api } from '@services/axios';
import userStore from '@stores/userStore';
import React from 'react';

export function Register() {
  const { setUsername, setId } = userStore();
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await api.post('/register', {
        username: nickname,
        password,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <form className="w-64" onSubmit={register}>
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
          Register
        </button>
      </form>
    </div>
  );
}
