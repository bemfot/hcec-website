'use client'

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import ContactLinks from '@/app/Contact-Us/ContactLinks/ContactLinks'

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Nigeria',
    state: '',
    city: '',
    request: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      'your_service_id',
      'your_template_id',
      formData,
      'your_user_id_or_public_key'
    ).then(() => {
      alert("Prayer request sent!");
      setFormData({
        name: '', email: '', phone: '', country: 'Nigeria', state: '', city: '', request: ''
      });
    }).catch((err) => {
      console.error(err);
      alert("Failed to send request.");
    });
  };

  return (

    <div>   <div className="md:px-10 md:pt-[6rem] md:pb-5 bg-gray-800 shadow-lg min-h-screen"

    >
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black/60 min-h-screen">
        {/* Left: Red Info Section */}
        <div className="bg-gray-700 py-8
          text-white px-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Contact Info</h2>
          <p className="mb-6">
          Whether you are just paying us a visit for the very first time, or you want to talk to us, or you have a prayer request, or you want to share your testimony, we are here for you. You can do so by filling the form or through mail, or via a simple phone call.
          </p>
          <div className="mb-2">
             <strong>Address:</strong> Ajao village, Bare Junction, Old Lagos Road, Alomaja Ibadan.
          </div>
          <div className="mb-2">
             <strong>Phone:</strong> +234 916 986 442, +234 906 099 3734
          </div>
          <div>
            📧 <strong>Email:</strong> info@hiscomingevangelicalchurch.org
          </div>
        </div>

        {/* Right: Form Section */}
        <div className="bg-white/90 p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-gray-800 text-white" />
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 bg-gray-800 text-white" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 bg-gray-800 text-white" />
            <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 bg-gray-800 text-white">
               <option>Nigeria</option>
              <option>Togo</option>
              <option>Benin Republic</option>
              {/* Add more countries */}
            </select>
            <input name="state" value={formData.state} onChange={handleChange} placeholder="State/Province" className="w-full p-2 bg-gray-800 text-white" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="Town/City" className="w-full p-2 bg-gray-800 text-white" />
            <textarea name="request" value={formData.request} onChange={handleChange} placeholder="Write your prayer request here..." rows={4} className="w-full p-2 bg-gray-800 text-white" />
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Submit Now</button>
          </form>
        </div>
      </div>
      
    </div>
    <ContactLinks/>
</div>
 
  );
}
