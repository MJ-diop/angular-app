/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
export class StripePaymentDto {
  public order: string;
  public method: string;
  public amount: Number;
  public currency: string;
}
