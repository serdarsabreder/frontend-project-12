import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearSendError } from '../slices/messagesSlice.js';

const validationSchema = yup.object({
  body: yup.string().trim().required('Обязательное поле'),
});

function MessageForm() {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const username = useSelector((state) => state.auth.username);
  const sendError = useSelector((state) => state.messages.sendError);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (currentChannelId === null) {
        setSubmitting(false);
        return;
      }
      try {
        const { meta } = await dispatch(addMessage({
          body: values.body.trim(),
          channelId: currentChannelId,
          username,
        }));
        if (meta.requestStatus === 'fulfilled') {
          resetForm();
        }
      } finally {
        setSubmitting(false);
      }
    },
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
          {sendError}
        </Alert>
      )}
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="d-flex align-items-center gap-2"
      >
        <Form.Control
          name="body"
          placeholder="Введите сообщение..."
          aria-label="Новое сообщение"
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
          Отправить
        </Button>
      </Form>
    </div>
  );
}

export default MessageForm;
