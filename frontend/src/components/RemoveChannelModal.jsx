import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ModalWindow from './ModalWindow.jsx';
import { removeChannel } from '../slices/channelsSlice.js';

function RemoveChannelModal({ channel, onClose }) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const { meta } = await dispatch(removeChannel(channel.id));
      if (meta.requestStatus === 'fulfilled') {
        onClose();
      } else {
        setError(meta.error?.message ?? 'Не удалось удалить канал');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalWindow onClose={onClose} title="Удалить канал">
      <p className="mb-3">Уверены?</p>
      <p className="text-danger mb-3">Вы удаляете канал # {channel.name}</p>
      {error && (
        <div className="text-danger mb-3">{error}</div>
      )}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={submitting}>
          Удалить
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
