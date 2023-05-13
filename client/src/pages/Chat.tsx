import { Avatar } from '@components/Partials/Avatar';
import { useUserContext } from '@context/UserContextProvider';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState('');

  const { username, id } = useUserContext();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4002');
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

  function sendMessage(ev) {
    ev.preventDefault();
  }

  const onlinePeopleExcludeOurUser = { ...onlinePeople };
  delete onlinePeopleExcludeOurUser[id];

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 bg-white p-2">
        <div className="border-b text-center font-bold text-blue-700">
          MernChat
        </div>
        <div>
          {Object.keys(onlinePeopleExcludeOurUser).map((userId) => (
            <div
              key={userId}
              className={
                'flex cursor-pointer items-center gap-2 border-b p-2 ' +
                (selectedUserId === userId && 'bg-cyan-300')
              }
              onClick={() => setSelectedUserId(userId)}
            >
              <Avatar username={onlinePeople[userId]} />
              {onlinePeople[userId]}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-2/3 flex-col bg-blue-100 p-2">
        <div className="flex-grow border">
          {!selectedUserId && (
            <h2 className="text-center font-bold opacity-70">
              Inicie uma conversa
            </h2>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              type="text"
              className="block flex-grow rounded-md border p-2"
              placeholder="Type your message here"
            />
            <button
              type="submit"
              className="rounded-md bg-brand-blue-100 p-5 hover:bg-blue-400 active:bg-blue-600"
            >
              <Icon icon="mdi:send" className="text-white" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
