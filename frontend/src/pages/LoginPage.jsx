import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.js';

const validationSchema = yup.object({
  username: yup.string().trim().required('Обязательное поле'),
  password: yup.string().required('Обязательное поле'),
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        dispatch(setCredentials(data));
        navigate('/');
      } catch {
        setStatus('Неверные имя пользователя или пароль');
      }
    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    formik.setStatus(null);
  };

  return (
    <Container fluid className="d-flex align-items-center min-vh-100">
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <Card.Title as="h1" className="text-center mb-4">Войти</Card.Title>
              {formik.status && (
                <Alert variant="danger" className="text-center">
                  {formik.status}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Ваш ник</Form.Label>
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
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Пароль</Form.Label>
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
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={formik.isSubmitting}>
                  Войти
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
