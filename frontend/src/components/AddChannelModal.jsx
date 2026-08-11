import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ChannelFormModal from './ChannelFormModal.jsx';
import { addChannel } from '../slices/channelsSlice.js';

function AddChannelModal({ onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (name) => {
    const { meta } = await dispatch(addChannel(name));
    if (meta.requestStatus === 'fulfilled') {
      toast.success('Канал создан');
    }
    return { meta };
  };

  return (
    <ChannelFormModal
      title="Добавить канал"
      submitText="Отправить"
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

AddChannelModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddChannelModal;
