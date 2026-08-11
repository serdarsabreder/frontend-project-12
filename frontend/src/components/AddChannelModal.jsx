import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelFormModal from './ChannelFormModal.jsx';
import { addChannel } from '../slices/channelsSlice.js';

function AddChannelModal({ onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (name) => {
    const { meta } = await dispatch(addChannel(name));
    if (meta.requestStatus === 'fulfilled') {
      toast.success(t('channels.created'));
    }
    return { meta };
  };

  return (
    <ChannelFormModal
      title={t('modals.add')}
      submitText={t('modals.submit')}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

AddChannelModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddChannelModal;
