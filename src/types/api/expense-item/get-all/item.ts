import { ExpenseItemType } from './expense-item-type';
import { Tag } from './tag';

export interface Item {
  id: number;
  name: string;
  color: string;
  expenseItemType: ExpenseItemType;
  tags: Tag[];
}
