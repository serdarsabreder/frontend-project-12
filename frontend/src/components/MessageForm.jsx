import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../slices/messagesSlice.js';

const validationSchema = yup.object({
  body: yup.string().trim().required('Обязательное поле'),
});

function MessageForm() {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const username = useSelector((state) => state.auth.username);

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
        await dispatch(addMessage({
          body: values.body.trim(),
          channelId: currentChannelId,
          username,
        }));
        resetForm();
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="input-area bg-white border-top p-3">
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
          onChange={formik.handleChange}
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
