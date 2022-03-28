import React, { useState, useEffect, useContext } from 'react'
import { MyContextProvider, MyContext } from '../context/MyContext'
import { useTranslation } from 'react-i18next'
import { CONTACT_POST } from '../sevices/globalServices'
import { toast } from 'react-toastify';
import axios from 'axios'
import cookies from 'js-cookie'
import pin from '../assets/img/Contact/map.svg'
import phone from '../assets/img/Contact/phone.svg'
import mail from '../assets/img/Contact/email.svg'
import { Formik, useField, Form } from "formik"
import * as Yup from "yup"
import MapComponent from './MapComponent';

const Contact = ({ lang }, props) => {
     const { t } = useTranslation()

     const [companiesInfo, setCompaniesInfo] = useContext(MyContext)

     const CustomInput = ({ label, ...props }) => {
          const [field, meta] = useField(props);

          return (
               <>
                    <label htmlFor={props.id || props.name}> {label} </label>
                    <input {...field} {...props} />
                    {meta.touched && meta.error ? (
                         <div className="error">{meta.error}</div>
                    ) : null}
               </>
          );
     };

     const CustomTextArea = ({ label, ...props }) => {
          const [field, meta] = useField(props);

          return (
               <>
                    <label htmlFor={props.id || props.name}> {label} </label>
                    <textarea {...field} {...props} />
                    {meta.touched && meta.error ? (
                         <div className="error">{meta.error}</div>
                    ) : null}
               </>
          );
     };

     const onsubmit = async (values, { setSubmitting, resetForm }) => {
          try {
               await axios.post(CONTACT_POST(), values)
                    .then(d => toast.success("Message sent with Success.", {
                         position: toast.POSITION.TOP_CENTER,
                         hideProgressBar: true
                    }))
                    .catch(err => toast.error("Try again in a second", {
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

     // const API_KEY = "AIzaSyBlllMSm32V0wcEqQrcD-FCoP433voN6HA"


     return (
          <MyContextProvider>
               <div className="contact__container0">
                    <div className='header'>
                         <h3>Contact Us</h3>
                         <h6>If you have any questions or need further information fell free to contect us.</h6>
                    </div>
                    <div className="contact__container">
                         <div className='form__container'>
                              <Formik
                                   initialValues={{
                                        name: "",
                                        email: "",
                                        subject: "",
                                        message: ""
                                   }}
                                   validationSchema={Yup.object({
                                        name: Yup.string()
                                             .min(3, "Minimum 3 Characters")
                                             .required("Required"),
                                        email: Yup.string().email("Inalid email").required("Required"),
                                        subject: Yup.string()
                                             .min(10, "Minimum 10 Characters")
                                             .required("Required"),
                                        message: Yup.string()
                                             .min(170, "Minimum 170 Characters")
                                             .required("Required"),
                                   })}
                                   onSubmit={onsubmit}
                              >
                                   {(props) => (
                                        <Form>
                                             <CustomInput
                                                  name="name"
                                                  type="text"
                                                  placeholder="Name"
                                             />

                                             <CustomInput
                                                  name="email"
                                                  type="email"
                                                  placeholder="Email"
                                             />

                                             <CustomInput
                                                  name="subject"
                                                  type="text"
                                                  placeholder="Subject"
                                             />

                                             <CustomTextArea
                                                  name="message"
                                                  placeholder="Your Message"
                                             />

                                             <button type="submit">
                                                  {props.isSubmitting ? "Loading..." : "Submit"}
                                             </button>

                                        </Form>
                                   )}
                              </Formik>
                         </div>
                         <div className='form__text' >
                              <div className="ci__containers">
                                   <div>
                                        <img src={pin} alt="anouar el sabah" />
                                        <p>{companiesInfo.address__en} </p>
                                   </div>
                                   <div>
                                        <img src={phone} alt="anouar el sabah" />
                                        <p>{companiesInfo.phone}  </p>
                                   </div>
                                   <div>
                                        <img src={mail} alt="anouar el sabah" />
                                        <p>{companiesInfo.email} </p>
                                   </div>
                              </div>
                              <div className="ci__map">
                                   <MapComponent data={companiesInfo} />
                              </div>
                         </div>
                    </div>
               </div>
          </MyContextProvider>
     )
}

export default Contact