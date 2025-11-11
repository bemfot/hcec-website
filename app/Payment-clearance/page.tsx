"use client";

import api from "@/utils/api";
import { extractPaymentReference } from "@/utils/providerReferenceExtracto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentFailed } from "../components/payment/payment-failed";
import { PaymentPending } from "../components/payment/payment-pending";
import { PaymentSuccess } from "../components/payment/payment-success";
import { PaymentDetails } from "../components/payment/types";

interface CallbackDataProp {
  provider: "flutterwave" | "paystack";
  txRef?: string;
  transactionId?: string;
  reference?: string;
}

export default function ChurchPaymentClearancePage() {
  const router = useRouter();

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const verifyPayment = async (callbackData?: CallbackDataProp) => {
    setIsLoading(true);

    try {
      if (!callbackData) {
        throw new Error("No payment reference found");
      }

      if (callbackData.provider === "paystack") {
        const data = {
          transactionReference: callbackData.reference,
          transactionId: null,
        };

        const request = await api.post(`/payment/verify`, data);
        const response = request.data.data;

        setPaymentDetails(response);
        return;
      }

      if (callbackData.provider === "flutterwave") {
        const data = {
          transactionReference:
            callbackData.txRef ?? callbackData.reference ?? null,
          transactionId: callbackData.transactionId ?? null,
        };

        const request = await api.post(`/payment/verify`, data);
        const response = request.data.data;
        setPaymentDetails(response);
        return;
      }

      throw new Error("Unsupported payment provider");
    } catch (err: any) {
      console.error("Payment verification error:", err);

      if (err?.response?.data?.message === "Transaction not found") {
        setPaymentDetails({
          status: "failed",
          amount: 0,
          reference: "UNKNOWN",
        });
      } else if (
        err?.code === "ERR_NETWORK" ||
        err?.code === "ECONNABORTED" ||
        err?.code === "ERR_BAD_RESPONSE" ||
        (err?.message && err.message.includes("Network Error"))
      ) {
        window.dispatchEvent(new CustomEvent("network-error"));
      } else {
        setPaymentDetails({
          status: "failed",
          amount: 0,
          reference: "UNKNOWN",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const callbackData = extractPaymentReference();
    verifyPayment(callbackData);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading || !paymentDetails) {
    return <PaymentPending />;
  }

  if (paymentDetails.status === "success") {
    return <PaymentSuccess details={paymentDetails} />;
  }

  return <PaymentFailed details={paymentDetails} onRetry={handleRetry} />;
}
