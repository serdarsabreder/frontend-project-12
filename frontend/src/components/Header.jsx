import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice.js';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header d-flex justify-content-between align-items-center bg-white border-bottom px-3">
      <h1 className="h4 mb-0">Hexlet Chat</h1>
      <Button variant="primary" onClick={handleLogout}>Выйти</Button>
    </header>
  );
}

export default Header;
