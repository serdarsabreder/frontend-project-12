import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../slices/authSlice.js';
import routes from '../services/routes.js';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.loginPagePath());
  };

  return (
    <header className="header d-flex justify-content-between align-items-center bg-white border-bottom px-3">
      <Link to={routes.chatPagePath()} className="navbar-brand h4 mb-0 text-decoration-none">{t('hexletChat')}</Link>
      {token && (
        <Button variant="primary" onClick={handleLogout}>{t('logout')}</Button>
      )}
    </header>
  );
}

export default Header;
