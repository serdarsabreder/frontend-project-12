import { useFormik } from 'formik';
import leoProfanity from '../services/profanity.js';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage, clearSendError } from '../slices/messagesSlice.js';
import { messageValidationSchema } from '../utils/validation.js';

function MessageForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const username = useSelector((state) => state.auth.username);
  const sendError = useSelector((state) => state.messages.sendError);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    if (currentChannelId === null) {
      setSubmitting(false);
      return;
    }
    try {
      const { meta } = await dispatch(addMessage({
        body: leoProfanity.clean(values.body.trim()),
        channelId: currentChannelId,
        username,
      }));
      if (meta.requestStatus === 'fulfilled') {
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleChange = (e) => {
    formik.handleChange(e);
    if (sendError) {
      dispatch(clearSendError());
    }
  };

  return (
    <div className="input-area bg-white border-top p-3">
      {sendError && (
        <Alert variant="danger" className="mb-2">
          {t(sendError)}
        </Alert>
      )}
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="d-flex align-items-center gap-2"
      >
        <Form.Control
          name="body"
          placeholder={t('chat.placeholder')}
          aria-label={t('chat.newMessage')}
          value={formik.values.body}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          disabled={currentChannelId === null}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={formik.isSubmitting || !formik.values.body.trim()}
        >
          {t('chat.send')}
        </Button>
      </Form>
    </div>
  );
}

export default MessageForm;
