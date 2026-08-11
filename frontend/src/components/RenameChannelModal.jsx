import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ChannelFormModal from './ChannelFormModal.jsx';
import { renameChannel } from '../slices/channelsSlice.js';

function RenameChannelModal({ channel, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (name) => dispatch(renameChannel({ id: channel.id, name }));

  return (
    <ChannelFormModal
      title="Переименовать канал"
      submitText="Отправить"
      initialName={channel.name}
      excludeId={channel.id}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

RenameChannelModal.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RenameChannelModal;
