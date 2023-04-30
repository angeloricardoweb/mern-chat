import React from 'react';

export function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <form className="w-64">
        <input
          type="text"
          className="mb-2 block w-full rounded-md border p-2"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
