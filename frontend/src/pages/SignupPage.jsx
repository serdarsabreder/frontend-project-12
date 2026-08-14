import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';
import routes from '../services/routes.js';
import { signupValidationSchema } from '../utils/validation.js';

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (values, { setStatus }) => {
    try {
      const { data } = await axios.post(routes.signupPath(), {
        username: values.username,
        password: values.password,
      });
      dispatch(setCredentials(data));
      navigate(routes.chatPagePath());
    } catch (err) {
      if (err?.response?.status === 409) {
        setStatus('signup.alreadyExists');
      } else {
        setStatus('signup.registrationError');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
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
              <Card.Title as="h1" className="text-center mb-4">{t('signup.header')}</Card.Title>
              {formik.status && (
                <Alert variant="danger" className="text-center">
                  {t(formik.status)}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>{t('signup.username')}</Form.Label>
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
                  <Form.Label>{t('signup.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && formik.errors.password}
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>{t('signup.confirm')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={formik.isSubmitting}>
                  {t('signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
