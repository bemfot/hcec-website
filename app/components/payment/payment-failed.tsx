"use client"

import React from "react";
import { XCircle, Church, RefreshCw, HelpCircle } from "lucide-react";
import { PaymentDetails } from "./types";

interface PaymentFailedProps {
  details: PaymentDetails;
  onRetry: () => void;
}

export const PaymentFailed: React.FC<PaymentFailedProps> = ({
  details,
  onRetry,
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-red-100">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          <div className="mb-4">
            <Church className="w-10 h-10 mx-auto" style={{ color: "#9f0712" }} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Unsuccessful
          </h1>

          <p className="text-gray-600 mb-6">
            We couldn&apos;t process your payment at this time. Please try again or contact support if the issue persists.
          </p>

          {details.amount > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Attempted Amount:</span>
                <span className="font-semibold text-lg text-gray-700">
                  {formatAmount(details.amount)}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Reference:</span>
                  <span className="font-mono text-xs text-gray-700 break-all">
                    {details.reference}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-red-50 rounded-lg p-4 mb-6 border-l-4" style={{ borderColor: "#9f0712" }}>
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#9f0712" }} />
              <div className="text-left">
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#9f0712" }}>
                  Common Issues:
                </h3>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>Insufficient funds in your account</li>
                  <li>Network connection issues</li>
                  <li>Incorrect payment details</li>
                  <li>Transaction timeout</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full py-3 px-6 rounded-lg text-white font-medium transition-all hover:bg-red-500 active:bg-red-700 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#9f0712" }}
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            {/* <button
              onClick={() => window.location.href = "mailto:support@yourchurch.com"}
              className="w-full py-3 px-6 rounded-lg border-2 font-medium transition-all hover:bg-red-50"
              style={{ borderColor: "#9f0712", color: "#9f0712" }}
            >
              Contact Support
            </button> */}
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Need help? Reach out to our support team
        </p>
      </div>
    </div>
  );
};