import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  tag: Yup.string().required("Please select a tag"),
});

interface NoteFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const NoteForm = ({ onSubmit, onCancel }: NoteFormProps) => {
  return (
    <Formik<FormValues>
      initialValues={{ title: "", content: "", tag: "Work" }}
      validationSchema={NoteSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              className={`${css.input} ${
                errors.title && touched.title ? css.inputError : ""
              }`}
              placeholder="Note title"
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              name="content"
              rows={4}
              className={`${css.textarea} ${
                errors.content && touched.content ? css.inputError : ""
              }`}
              placeholder="Note description"
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" name="tag" className={css.select}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Todo">Todo</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
