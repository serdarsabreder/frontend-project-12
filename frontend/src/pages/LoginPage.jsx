import { Formik, Form } from 'formik';
import { Button, Card, Col, Container, Form as BootstrapForm, Row } from 'react-bootstrap';

function LoginPage() {
  return (
    <Container fluid className="d-flex align-items-center min-vh-100">
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Card>
            <Card.Body className="p-4">
              <Card.Title as="h1" className="text-center mb-4">Войти</Card.Title>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={() => {
                  // Отправка данных на сервер будет реализована на следующем этапе
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form>
                    <BootstrapForm.Group className="mb-3" controlId="username">
                      <BootstrapForm.Label>Ваш ник</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="username"
                      />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group className="mb-3" controlId="password">
                      <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                      />
                    </BootstrapForm.Group>
                    <Button type="submit" variant="primary" className="w-100">Войти</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
