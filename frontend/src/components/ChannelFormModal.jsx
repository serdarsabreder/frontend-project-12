import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ModalWindow from './ModalWindow.jsx';

function ChannelFormModal({
  title,
  submitText,
  initialName = '',
  excludeId = null,
  onClose,
  onSubmit,
}) {
  const channels = useSelector((state) => state.channels.channels);
  const inputRef = useRef(null);

  const existingNames = channels
    .filter(({ id }) => id !== excludeId)
    .map(({ name }) => name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('unique', 'Должно быть уникальным', (value) => !existingNames.includes(value)),
  });

  const formik = useFormik({
    initialValues: { name: initialName },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const { meta } = await onSubmit(leoProfanity.clean(values.name.trim()));
        if (meta.requestStatus === 'fulfilled') {
          onClose();
        } else {
          setStatus(meta.error?.message ?? 'Не удалось выполнить операцию');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ModalWindow onClose={onClose} title={title}>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="channelName">
          <Form.Label>Имя канала</Form.Label>
          <Form.Control
            ref={inputRef}
            name="name"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
            disabled={formik.isSubmitting}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        {formik.status && (
          <div className="text-danger mb-3">{formik.status}</div>
        )}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting || !formik.values.name.trim()}
          >
            {submitText}
          </Button>
        </div>
      </Form>
    </ModalWindow>
  );
}

ChannelFormModal.propTypes = {
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  initialName: PropTypes.string,
  excludeId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChannelFormModal;
