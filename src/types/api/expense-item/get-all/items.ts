import { ExpenseItemType } from './expense-item-type';
import { Tag } from './tag';

export interface Items {
  id: number;
  name: string;
  color: string;
  expenseItemType: ExpenseItemType;
  tags: Tag[];
}
