import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ChannelFormModal from './ChannelFormModal.jsx';
import { addChannel } from '../slices/channelsSlice.js';

function AddChannelModal({ onClose }) {
  const dispatch = useDispatch();

  const handleSubmit = (name) => dispatch(addChannel(name));

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
