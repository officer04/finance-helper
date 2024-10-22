import { Items } from '../../api/expense-item/get-all/items';
import { LoadStatus } from './load-status';

export interface ExpenseItemState {
  expenseItems: Items[];
  loadStatus: LoadStatus;
}
