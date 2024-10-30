import { ExpenseItemType } from "../../expense-item/get-all/expense-item-type";
import { Tag } from "../../expense-item/get-all/tag";

export interface IncomeSource {
  id: number;
  name: string;
  color: string;
  expenseItemType: ExpenseItemType;
  tags: Tag[];
}
