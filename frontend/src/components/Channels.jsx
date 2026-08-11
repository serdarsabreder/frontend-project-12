import { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import { setCurrentChannel } from '../slices/channelsSlice.js';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const [modal, setModal] = useState({ type: null, channel: null });

  const closeModal = () => setModal({ type: null, channel: null });

  const modalChannelId = modal.channel?.id;
  const modalChannelExists = !modalChannelId
    || channels.some(({ id }) => id === modalChannelId);

  return (
    <aside className="sidebar">
      <div className="sidebar-header d-flex align-items-center gap-2 px-3 py-3">
        <span className="fw-semibold">Каналы</span>
        <Button
          variant="link"
          className="add-channel-btn p-0 ms-auto"
          aria-label="Добавить канал"
          onClick={() => setModal({ type: 'adding' })}
        >
          +
        </Button>
      </div>
      <ul className="channels-list">
        {channels.map(({ id, name, removable }) => (
          <li key={id} className="channel-item-row">
            <button
              type="button"
              className={`channel-item${id === currentChannelId ? ' active' : ''}`}
              onClick={() => dispatch(setCurrentChannel(id))}
            >
              # {name}
            </button>
            {removable && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  bsPrefix="channel-menu-btn"
                  id={`channel-menu-${id}`}
                  aria-label="Управление каналом"
                >
                  ⋮
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setModal({ type: 'renaming', channel: { id, name } })}
                  >
                    Переименовать
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setModal({ type: 'removing', channel: { id, name } })}
                  >
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
      {modal.type === 'adding' && <AddChannelModal onClose={closeModal} />}
      {modal.type === 'renaming' && modalChannelExists && (
        <RenameChannelModal channel={modal.channel} onClose={closeModal} />
      )}
      {modal.type === 'removing' && modalChannelExists && (
        <RemoveChannelModal channel={modal.channel} onClose={closeModal} />
      )}
    </aside>
  );
}

export default Channels;
