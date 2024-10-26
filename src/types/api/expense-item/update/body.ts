export interface UpdateExpenseItemBody {
  id: number
  body: {
    name: string;
    color: string;
    expenseItemTypeCode: string;
  };
}
