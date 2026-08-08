import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../components/Channels.jsx';
import Header from '../components/Header.jsx';
import MessageForm from '../components/MessageForm.jsx';
import Messages from '../components/Messages.jsx';
import { fetchChannels } from '../slices/channelsSlice.js';
import { fetchMessages } from '../slices/messagesSlice.js';

function ChatPage() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.messages);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelMessagesCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="chat-page">
      <Header />
      <div className="main-container">
        <Channels />
        <main className="chat-area">
          <div className="chat-header bg-white border-bottom px-3 py-3 d-flex align-items-center">
            <span className="fw-semibold"># {currentChannel?.name ?? ''}</span>
            <span className="text-secondary ms-2">
              {channelMessagesCount} сообщений
            </span>
          </div>
          <Messages />
          <MessageForm />
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
