import React from 'react'
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import { SUBSCRIBE } from "../../sevices/globalServices"
import axios from 'axios'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'

function Subscribe() {
     const { t } = useTranslation()

     const CustomInput = ({ label, ...props }) => {
          const [field, meta] = useField(props);

          return (
               <div className="inputContainer">
                    <input {...field} {...props} />
                    {meta.touched && meta.error ? (
                         <div className="error">{meta.error}</div>
                    ) : null}
               </div>
          );
     };

     const onsubmit = async (values, { setSubmitting, resetForm }) => {
          try {
               await axios.post(SUBSCRIBE(), values)
                    .then(d => toast.success("Subscribed with Success.", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    }))
                    .catch(err => toast.error("Email Already exists. Try another one", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    })
                    )
               setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
               }, 1000);
          } catch (error) {
               console.error('SUBSCRIBE error', error)
          }
     }


     return (
          <div className='subscribe__container' >
               <h2>{t('Subsc')} </h2>

               <Formik
                    initialValues={{
                         name: "",
                         email: "",
                    }}

                    validationSchema={Yup.object({
                         name: Yup.string()
                              .min(3, "Minimum 3 Cara")
                              .required("Required"),
                         email: Yup.string().email("Invalid Email").required("Required"),
                    })}

                    onSubmit={onsubmit}
               >
                    {(props) => (
                         <Form className='subscribeForm__container'>
                              <CustomInput
                                   name="name"
                                   type="text"
                                   placeholder={t('name')}
                              />

                              <CustomInput
                                   name="email"
                                   type="email"
                                   placeholder={t('Youremail')}
                              />

                              <button type="submit">
                                   {props.isSubmitting ? t('loading') : t('submit')}
                              </button>

                         </Form>
                    )}
               </Formik>
          </div>
     )
}

export default Subscribe
