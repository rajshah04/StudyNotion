import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-6'>
        <h1 className='text-4xl font-semibold text-center'>
            Get in Touch
        </h1>

        <p className='text-base font-medium text-richblack-300 text-center mb-14'>
            We'd love to hear from you, please out this form.
        </p>

        <ContactUsForm />
    </div>
  )
}

export default ContactFormSection