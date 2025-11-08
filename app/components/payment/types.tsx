export interface PaymentDetails {
  status: "success" | "failed" | "pending";
  amount: number;
  reference: string;
  date?: string;
  description?: string;
}