import { Items } from '../../api/expense-item/get-all/items';
import { LoadStatus } from '../../shared/load-status';

export interface ExpenseItemState {
  expenseItems: Items[];
  loadStatus: LoadStatus;
}
