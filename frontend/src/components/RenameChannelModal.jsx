import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelFormModal from './ChannelFormModal.jsx';
import { renameChannel } from '../slices/channelsSlice.js';

function RenameChannelModal({ channel, onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (name) => {
    const { meta } = await dispatch(renameChannel({ id: channel.id, name }));
    if (meta.requestStatus === 'fulfilled') {
      toast.success(t('channels.renamed'));
    }
    return { meta };
  };

  return (
    <ChannelFormModal
      title={t('modals.rename')}
      submitText={t('modals.submit')}
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
