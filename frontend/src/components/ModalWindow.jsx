import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function ModalWindow({ title, onClose, children }) {
  return (
    <div data-testid="modal">
      <Modal show onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}

ModalWindow.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalWindow;
