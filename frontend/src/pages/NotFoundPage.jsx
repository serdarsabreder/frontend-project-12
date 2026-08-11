import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="text-secondary">{t('notFound.header')}</p>
      <Link to="/" className="btn btn-primary">{t('notFound.linkText')}</Link>
    </div>
  );
}

export default NotFoundPage;
