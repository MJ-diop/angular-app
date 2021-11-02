export type PaymentDto = {
  id?: string | undefined;
  order: string;
  method: string;
  amount: number;
  currency: string;
}
