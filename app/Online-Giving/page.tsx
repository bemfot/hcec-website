// app/give/page.tsx
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function GivePage() {
  const [paymentCode, setPaymentCode] = useState("");
  const [form, setForm] = useState({
    payType: "",
    lastName: "",
    firstName: "",
    email: "",
    sex: "",
    country: "",
    phone: "",
    currency: "NGN",
    amount: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call payment API
    alert("Submit form with data: " + JSON.stringify(form));
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 pt-30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow--lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Online Giving / Offering</h1>
          <p className="text-gray-600 mb-6">
            Beloved of the Lord, please enter your Payment Code if you already have one,
            or fill the form to make a donation. God will surely bless.
          </p>

          {/* Payment Code Entry */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={paymentCode}
                onChange={e => setPaymentCode(e.target.value)}
                placeholder="Enter your payment code"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>

          <hr className="my-8" />

          {/* Donation Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type *
              </label>
              <select
                name="payType"
                required
                value={form.payType}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">— Select Payment Type —</option>
                <option value="Online Tithes">Online Tithes</option>
                <option value="Freewill Donation">Freewill Donation</option>
                <option value="Convention Offering">Convention Offering</option>
                <option value="Thanksgiving Offering">Thanksgiving Offering</option>
                <option value="FirstFruit Support">FirstFruit Support</option>
                <option value="Building Support">Building Support</option>
              
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
                <select
                  name="sex"
                  required
                  value={form.sex}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">—Select—</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <select
                  name="country"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Select Country —</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Benin Republic">Benin Republic</option>
                  <option value="Togo">Togo</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>

                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
                <select
                  name="currency"
                  required
                  value={form.currency}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                <input
                  name="amount"
                  required
                  value={form.amount}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-3 rounded-md text-lg font-bold hover:bg-red-700 transition"
              >
                Proceed to Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
