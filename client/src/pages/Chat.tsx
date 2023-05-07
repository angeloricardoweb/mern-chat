import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    setWs(ws);
    ws.onopen = () => {
      console.log('connected with websocket server');
    };
    ws.onmessage = (e) => {
      console.log(e);
    }
  }, []);
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 bg-white p-2">contacts</div>
      <div className="flex w-2/3 flex-col bg-blue-100 p-2">
        <div className="flex-grow border">msgs</div>
        <div className="flex gap-2">
          <input
            type="text"
            className="block flex-grow rounded-md border p-2"
            placeholder="Type your message here"
          />
          <button className="rounded-md bg-brand-blue-100 p-5 hover:bg-blue-400 active:bg-blue-600">
            <Icon icon="mdi:send" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
