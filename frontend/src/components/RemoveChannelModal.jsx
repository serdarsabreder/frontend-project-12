import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ModalWindow from './ModalWindow.jsx';
import { removeChannel } from '../slices/channelsSlice.js';

function RemoveChannelModal({ channel, onClose }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const { meta } = await dispatch(removeChannel(channel.id));
      if (meta.requestStatus === 'fulfilled') {
        toast.success(t('channels.removed'));
        onClose();
      } else {
        setError(meta.error?.message ?? 'errors.unknown');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalWindow onClose={onClose} title={t('modals.remove')}>
      <p className="mb-3">{t('modals.confirmation')}</p>
      <p className="text-danger mb-3">{t('modals.removingText', { name: channel.name })}</p>
      {error && (
        <div className="text-danger mb-3">{t(error)}</div>
      )}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={submitting}>
          {t('modals.confirm')}
        </Button>
      </div>
    </ModalWindow>
  );
}

RemoveChannelModal.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RemoveChannelModal;
