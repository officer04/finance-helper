import { ExpenseItem } from '../../api/expense-item/get-all/item';
import { LoadStatus } from '../../shared/load-status';

export interface ExpenseItemState {
  expenseItems: ExpenseItem[];
  loadStatus: LoadStatus;
}
