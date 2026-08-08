import { useSelector } from 'react-redux';

function Messages() {
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  return (
    <div className="messages-area">
      {channelMessages.length === 0 ? (
        <p className="text-secondary mb-0 text-center">Пока нет сообщений</p>
      ) : (
        channelMessages.map(({ id, username, body }) => (
          <div key={id} className="message-item">
            <span className="message-author me-2">{username}:</span>
            <span className="message-body">{body}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
