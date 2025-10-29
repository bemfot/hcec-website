'use client'

import React, { useState } from 'react';
import emailjs from 'emailjs-com';


export default function PrayerRequestForm() {
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

    <div className=''>   <div className="md:px-10  md:mt-[8rem]   md:pb-5 shadow-lg min-h-screen"

    >
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black/60 min-h-screen">

        {/* Left: Info Section */}
        <div className="bg-gray-700 mt-[4rem] text-white p-10 lg:px-20 lg:pb-[7rem] flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Prayer Request</h2>
          <p className="mb-6">
            You can now conveniently submit your prayer requests online, by filling the form or through mail,
            or via a simple phone call. This seamless process ensures that heartfelt intentions reach the dedicated prayer team.
          </p>
          <div className="mb-2">
            📞 <strong>Phone:</strong> 08024097119
          </div>
          <div>
            📧 <strong>Email:</strong>info@hiscomingevangelicalchurch.org
          </div>
        </div>

        {/* Right: Form Section */}
        <div className="bg-white/90 p-8 flex flex-col justify-center">
          <h2 className="lg:text-4xl text-3xl font-bold text-gray-700 mb-4">Drop your Prayer Request</h2>
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
  
</div>
 
  );
}
