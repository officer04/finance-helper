export interface HandleUpdateIncomeSourceCard {
  (
    id: number,
    name: string,
    color: string,
    incomeSourceTypeCode: { code: string; name: string },
  ): void;
}