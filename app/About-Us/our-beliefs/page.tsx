"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function OurBeliefs() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Our Beliefs</h1>
          <p className="text-gray-600 mb-6">
            This section is being prepared. Click below to learn more.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            View Our Beliefs
          </button>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-sm w-full p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">
                Content coming soon
              </h2>
              <p className="text-gray-600 mb-4">
                Content will soon be available.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
