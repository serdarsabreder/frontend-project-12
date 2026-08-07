import { useSelector } from 'react-redux';

function ChatPage() {
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="text-center py-5">
      <h1>Hexlet Chat</h1>
      <p className="text-secondary">Вы вошли как {username}</p>
    </div>
  );
}

export default ChatPage;
