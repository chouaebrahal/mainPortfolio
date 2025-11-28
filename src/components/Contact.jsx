import React, { useState } from "react";
import SectionsHeader from "./SectionsHeader";
import Button from "./Button";
import emailjs from "@emailjs/browser";
import Alert from "./alert";
const Contact = () => {

  const [showMsg, setShowMsg] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [alerType,setAlerType] = useState('success')

  const handleSend = (msg,type) => {
    // Example: send email logic here
    setMsgText(msg);
    setAlerType(type);
    setShowMsg(true);
    

    // Hide after 2 seconds
    setTimeout(() => {
      setShowMsg(false);
    }, 2000);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Clear previous error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    let errors = {};

    if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      document.getElementById('name-error').textContent = errors.name;
    }
    if (!email.trim().includes("@")) {
      errors.email = "Please enter a valid email address";
      document.getElementById('email-error').textContent = errors.email;
    }
    if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      document.getElementById('message-error').textContent = errors.message;
    }

    if (Object.keys(errors).length > 0) {
      // Focus on the first error field
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      handleSend("Please correct the errors before submitting", "error");
      return;
    }

    const title = `New message from ${name}`;
    const time = new Date().toLocaleString();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      title: title,
      time: time
    };

    // Disable submit button during submission
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs
      .send(
        "service_3yfytxv",
        "template_8ia5s58",
        templateParams,
        "h-5BMSJ5gzXQL13Qt"
      )
      .then(() => {
        handleSend("Message sent successfully!", "success");
        e.target.reset(); // Reset form on success
      })
      .catch((err) => {
        handleSend("Message failed to send. Please try again.", "error");
        console.log("Error:", err);
      })
      .finally(() => {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
};

  return (
    <section id="contact" className="pb-30 relative z-10" aria-labelledby="contact-heading">
      {showMsg && <Alert text={msgText} type={alerType} />}
      <SectionsHeader
        description={
          "Have a project, idea, or question? Send me a message and I'll be happy to help. I'm just one click away!"
        }
        title={"Get in Touch"}
        headingLevel="h2"
      />
      <div className="container mx-auto px-5 w-full flex flex-col items-center">
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleSubmit(formData);
        }} className="w-full max-w-lg space-y-5" noValidate>
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="border border-border rounded-lg p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary"
              required
              aria-required="true"
              aria-describedby="name-error"
            />
            <div id="name-error" className="sr-only" aria-live="polite"></div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="border border-border rounded-lg p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary"
              required
              aria-required="true"
              aria-describedby="email-error"
            />
            <div id="email-error" className="sr-only" aria-live="polite"></div>
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium mb-1">
              Message <span className="text-red-500" aria-label="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows={5}
              className="border border-border rounded-lg p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary resize-none"
              required
              aria-required="true"
              aria-describedby="message-error"
            ></textarea>
            <div id="message-error" className="sr-only" aria-live="polite"></div>
          </div>

          {/* Submit Button */}
           <Button
             type={'submit'}
             className={`w-full focus:outline-none focus:ring-2 focus:ring-primary rounded`}
             aria-label="Send message"
           >
             Send Message
           </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
