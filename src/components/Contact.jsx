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

  
  const handleSubmit = (formData) => {
 
 
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');


   const title = `New message from ${name}`;
  const time = new Date().toLocaleString();

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    title: title,
    time: time
  };

 

  let errors = {};

  if (name.trim().length < 2) errors.name = "Name must be at least 2 chars";
  if (!email.trim().includes("@")) errors.email = "Email is invalid";
  if (message.trim().length < 10) errors.message = "Message too short";

  if (Object.keys(errors).length > 0) {
    // Show first error in alert
    const firstError = errors[Object.keys(errors)[0]];
    handleSend("Message sent Failed! " + firstError,"error");
    return;
  }

   emailjs
    .send(
      "service_3yfytxv",
      "template_8ia5s58",
      templateParams,
      "h-5BMSJ5gzXQL13Qt"
    )
    .then(() => {
      handleSend("Message sent successfully!","success");
    })
    .catch((err) => {
      handleSend("Message sent Failed!","error");
      console.log("Error:", err);
    });

 
};  

  return (
    <section id="contact" className="pb-30 relative z-10">
      {showMsg && <Alert text={msgText} type={alerType} />}  
      <SectionsHeader
        description={
          "Have a project, idea, or question? Send me a message and I’ll be happy to help. I’m just one click away!"
        }
        title={"Get in Touch"}
      />
      <div className="container mx-auto px-5 w-full flex flex-col items-center">
        <form action={handleSubmit} className="w-full max-w-lg space-y-5 ">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="border border-border rounded-lg p-3 outline-none  focus:border-primary"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="border border-border rounded-lg p-3 outline-none  focus:border-primary"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows={5}
              className="border border-border rounded-lg p-3 outline-none  focus:border-primary resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
           <Button type={'submit'} className={`w-full`} >Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
