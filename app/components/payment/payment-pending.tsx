"use client"

import React from "react";
import { Loader2, Church } from "lucide-react";

export const PaymentPending: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "#9f0712" }}>
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>

          <div className="mb-4">
            <Church className="w-10 h-10 mx-auto" style={{ color: "#9f0712" }} />
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: "#9f0712" }}>
            Verifying Payment
          </h1>

          <p className="text-gray-600 mb-6">
            Please wait while we confirm your transaction...
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ 
                backgroundColor: "#9f0712",
                animationDelay: "0ms"
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ 
                backgroundColor: "#9f0712",
                animationDelay: "150ms"
              }}
            />
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ 
                backgroundColor: "#9f0712",
                animationDelay: "300ms"
              }}
            />
          </div>

          <div className="bg-red-50 rounded-lg p-4 border-l-4" style={{ borderColor: "#9f0712" }}>
            <p className="text-sm text-gray-700">
              This may take a few moments. Please do not close this page or refresh your browser.
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Thank you for your patience
        </p>
      </div>
    </div>
  );
};