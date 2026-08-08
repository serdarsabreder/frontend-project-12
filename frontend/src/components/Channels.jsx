import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <aside className="sidebar">
      <div className="sidebar-header d-flex align-items-center gap-2 px-3 py-3">
        <span className="fw-semibold">Каналы</span>
        <Button
          variant="link"
          className="add-channel-btn p-0 ms-auto"
          aria-label="Добавить канал"
        >
          +
        </Button>
      </div>
      <ul className="channels-list">
        {channels.map(({ id, name }) => (
          <li key={id}>
            <button
              type="button"
              className={`channel-item${id === currentChannelId ? ' active' : ''}`}
              onClick={() => dispatch(setCurrentChannel(id))}
            >
              # {name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Channels;
