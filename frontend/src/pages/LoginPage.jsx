import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';
import routes from '../services/routes.js';
import { loginValidationSchema } from '../utils/validation.js';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setStatus }) => {
    try {
      const { data } = await axios.post(routes.loginPath(), values);
      dispatch(setCredentials(data));
      navigate(routes.chatPagePath());
    } catch {
      setStatus('login.authFailed');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setStatus(null);
  };

  return (
    <Container fluid className="d-flex align-items-center flex-grow-1">
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <Card.Title as="h1" className="text-center mb-4">{t('login.header')}</Card.Title>
              {formik.status && (
                <Alert variant="danger" className="text-center">
                  {t(formik.status)}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('login.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && formik.errors.username}
                    autoComplete="username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && formik.errors.password}
                    autoComplete="current-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={formik.isSubmitting}>
                  {t('login.submit')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <span>{t('login.newToChat')} </span>
              <Link to={routes.signupPagePath()}>{t('login.signup')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
