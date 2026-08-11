import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Messages() {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const bottomRef = useRef(null);

  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [channelMessages.length]);

  return (
    <div className="messages-area">
      {channelMessages.length === 0 ? (
        <p className="text-secondary mb-0 text-center">{t('chat.noMessages')}</p>
      ) : (
        channelMessages.map(({ id, username, body }) => (
          <div key={id} className="message-item">
            <span className="message-author me-2">{username}:</span>
            <span className="message-body">{body}</span>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default Messages;
