"use client";

import api from "@/utils/api";
import { useState } from "react";

export default function GivePage() {
  const [paymentCode, setPaymentCode] = useState("");
  const [form, setForm] = useState({
    offeringType: "",
    lastName: "",
    firstName: "",
    email: "",
    sex: "",
    country: "",
    phone: "",
    currency: "NGN",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // amount is required; validate and convert
      const rawAmount = String(form.amount ?? "").trim();
      if (!rawAmount) {
        alert("Amount is required");
        setIsSubmitting(false);
        return;
      }
      const parsedAmount = Number(rawAmount);
      if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid amount greater than zero");
        setIsSubmitting(false);
        return;
      }

      const payload: Record<string, any> = { amount: parsedAmount };
      const optionalFields = [
        "offeringType",
        "lastName",
        "firstName",
        "email",
        "sex",
        "country",
        "phone",
        "currency",
      ];
      optionalFields.forEach((key) => {
        const val = (form as any)[key];
        if (val !== undefined && val !== null && String(val).trim() !== "") {
          payload[key] = val;
        }
      });

      const response = await api.post(`/give`, payload);
      console.log(response);
      const paymentUrl = response?.data?.data?.url ?? response?.data?.url;

      if (!paymentUrl) {
        alert("Payment URL not returned from server. Please try again.");
        return;
      }

      window.location.href = paymentUrl;
    } catch (err: any) {
      console.error("Give API error:", err);
      const message =
        err?.response?.data?.message ??
        err?.message ??
        "An error occurred. Please try again.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow--lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Online Giving / Offering
            </h1>
            <p className="text-gray-600 mb-6">
              Beloved of the Lord, please enter your Payment Code if you already
              have one, or fill the form to make a donation. God will surely
              bless.
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
                  onChange={(e) => setPaymentCode(e.target.value)}
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
                  Offering Type *
                </label>
                <select
                  required
                  name="offeringType"
                  value={form.offeringType}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">— Select Payment Type —</option>
                  <option value="Online Tithes">Online Tithes</option>
                  <option value="Freewill Donation">Freewill Donation</option>
                  <option value="Convention Offering">
                    Convention Offering
                  </option>
                  <option value="Thanksgiving Offering">
                    Thanksgiving Offering
                  </option>
                  <option value="FirstFruit Support">FirstFruit Support</option>
                  <option value="Building Support">Building Support</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sex
                  </label>
                  <select
                    name="sex"
                    value={form.sex}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">—Select—</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency *
                  </label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
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
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={`w-full flex items-center justify-center bg-red-600 text-white px-4 py-3 rounded-md text-lg font-bold transition ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                >
                  <span>Proceed to Pay</span>
                  {isSubmitting && (
                    <span className="ml-3 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
