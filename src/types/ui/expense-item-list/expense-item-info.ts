export interface ExpenseItemInfo {
  id: number;
  name: string;
  color: string;
  expenseItemTypeCode: { code: string; name: string };
}