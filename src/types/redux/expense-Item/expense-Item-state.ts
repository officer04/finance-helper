import { Item } from '../../api/expense-item/get-all/item';
import { LoadStatus } from '../../shared/load-status';

export interface ExpenseItemState {
  expenseItems: Item[];
  loadStatus: LoadStatus;
}
