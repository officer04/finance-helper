export interface HandleUpdateCard {
  (
    id: number,
    name: string,
    color: string,
    expenseItemTypeCode: { code: string; name: string },
  ): void;
}