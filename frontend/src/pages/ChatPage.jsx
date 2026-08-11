import { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Channels from '../components/Channels.jsx';
import MessageForm from '../components/MessageForm.jsx';
import Messages from '../components/Messages.jsx';
import {
  addChannelReceived,
  fetchChannels,
  removeChannelReceived,
  renameChannelReceived,
} from '../slices/channelsSlice.js';
import { addMessageReceived, fetchMessages, removeMessagesByChannel } from '../slices/messagesSlice.js';
import { socket } from '../services/socket.js';

function ChatPage() {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(socket.connected);
  const channels = useSelector((state) => state.channels.channels);
  const channelsLoading = useSelector((state) => state.channels.loading);
  const channelsError = useSelector((state) => state.channels.error);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.messages);
  const messagesLoading = useSelector((state) => state.messages.loading);
  const messagesError = useSelector((state) => state.messages.error);

  useEffect(() => {
    const handleNewMessage = (message) => dispatch(addMessageReceived(message));
    const handleNewChannel = (channel) => dispatch(addChannelReceived(channel));
    const handleRenameChannel = (channel) => dispatch(renameChannelReceived(channel));
    const handleRemoveChannel = ({ id }) => {
      dispatch(removeChannelReceived({ id }));
      dispatch(removeMessagesByChannel(id));
    };
    const handleConnect = () => setIsOnline(true);
    const handleDisconnect = () => setIsOnline(false);

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('renameChannel', handleRenameChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  };

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelMessagesCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;
  const isLoading = channelsLoading || messagesLoading;
  const loadError = channelsError ?? messagesError;

  return (
    <div className="chat-page">
      {!isOnline && (
        <div className="offline-banner">
          <span>Соединение потеряно...</span>
        </div>
      )}
      <div className="main-container">
        <Channels />
        <main className="chat-area">
          {isLoading ? (
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : loadError ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 gap-2 p-3">
              <Alert variant="danger" className="mb-0 text-center">
                {loadError}
              </Alert>
              <Button variant="primary" onClick={handleRetry}>
                Повторить
              </Button>
            </div>
          ) : (
            <>
              <div className="chat-header bg-white border-bottom px-3 py-3 d-flex align-items-center">
                <span className="fw-semibold channel-name"># {currentChannel?.name ?? ''}</span>
                <span className="text-secondary ms-2">
                  {channelMessagesCount} сообщений
                </span>
              </div>
              <Messages />
              <MessageForm />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
