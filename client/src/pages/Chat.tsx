import { Avatar } from '@components/Partials/Avatar';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onlinePeople, setOnlinePeople] = useState({});

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    setWs(ws);
    ws.onopen = () => {
      console.log('connected with websocket server');
    };
    ws.onmessage = (e) => {
      console.log(e);
      hnadleMessage(e);
    };
  }, []);

  function showOnlinePeople(online: string[]) {
    const people = {};
    online.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function hnadleMessage(e) {
    const messageData = JSON.parse(e.data);
    if ('online' in messageData) {
      showOnlinePeople(messageData.online);
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 bg-white p-2">
        <div className="border-b text-center font-bold text-blue-700">
          MernChat
        </div>
        <div>
          {Object.keys(onlinePeople).map((userId) => (
            <div key={userId} className="flex items-center gap-2 border-b p-2">
              <Avatar username={onlinePeople[userId]} />
              {onlinePeople[userId]}
            </div>
          ))}
        </div>
      </div>
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
