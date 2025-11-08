"use client";

import { CheckCircle, Church, Heart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PaymentDetails } from "./types";
import { useRouter } from "next/navigation";

interface PaymentSuccessProps {
  details: PaymentDetails;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ details }) => {
  const router = useRouter();

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
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-green-100">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <div className="mb-4">
            <Church
              className="w-10 h-10 mx-auto"
              style={{ color: "#9f0712" }}
            />
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: "#9f0712" }}>
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your generous contribution. God bless you abundantly!
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Amount Paid:</span>
              <span
                className="font-semibold text-lg"
                style={{ color: "#9f0712" }}
              >
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

            {details.date && (
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Date:</span>
                  <span className="text-sm text-gray-700">
                    {new Date(details.date).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div
            className="bg-red-50 rounded-lg p-4 mb-6 border-l-4"
            style={{ borderColor: "#9f0712" }}
          >
            <div className="flex items-start gap-2">
              <Heart
                className="w-5 h-5 mt-1 flex-shrink-0"
                style={{ color: "#9f0712" }}
              />
              <div className="text-left">
                <p className="text-sm text-gray-700 italic mb-2">
                  &quot;Each of you should give what you have decided in your
                  heart to give, not reluctantly or under compulsion, for God
                  loves a cheerful giver.&quot;
                </p>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#9f0712" }}
                >
                  - 2 Corinthians 9:7
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/Online-Giving")}
              className="w-full py-3 px-6 rounded-lg text-white font-medium transition-all hover:bg-red-500 active:bg-red-700"
              style={{ backgroundColor: "#9f0712" }}
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => window.print()}
              className="w-full py-3 px-6 rounded-lg border-2 font-medium transition-all hover:bg-red-50"
              style={{ borderColor: "#9f0712", color: "#9f0712" }}
            >
              Print Receipt
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Your contribution supports the work of God&apos;s kingdom
        </p>
      </div>
    </div>
  );
};
