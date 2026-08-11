import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const existingNames = channels
    .filter(({ id }) => id !== excludeId)
    .map(({ name }) => name);

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('modals.required')
      .min(3, 'modals.min')
      .max(20, 'modals.max')
      .test('unique', 'modals.uniq', (value) => !existingNames.includes(value)),
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
          setStatus(meta.error?.message ?? 'errors.unknown');
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
          <Form.Label>{t('modals.channelName')}</Form.Label>
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
            {t(formik.errors.name)}
          </Form.Control.Feedback>
        </Form.Group>
        {formik.status && (
          <div className="text-danger mb-3">{t(formik.status)}</div>
        )}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t('modals.cancel')}
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
