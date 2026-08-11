import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ChannelFormModal from './ChannelFormModal.jsx';
import { renameChannel } from '../slices/channelsSlice.js';

function RenameChannelModal({ channel, onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (name) => {
    const { meta } = await dispatch(renameChannel({ id: channel.id, name }));
    if (meta.requestStatus === 'fulfilled') {
      toast.success('Канал переименован');
    }
    return { meta };
  };

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
