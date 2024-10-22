import { ExpenseItemType } from "./expense-item-type";
import { Tags } from "./tags";

export interface Items {
  id: number;
  name: string;
  color: string;
  expenseItemType: ExpenseItemType;
  tags: Tags[];
}