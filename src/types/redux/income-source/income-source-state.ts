import { IncomeSource } from '../../api/income-source/get-all/income-source';
import { LoadStatus } from '../../shared/load-status';

export interface incomeSourceState {
  incomeSourceItems: IncomeSource[];
  loadStatus: LoadStatus;
}
