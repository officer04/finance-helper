import { IncomeSourceType } from "./income-source-type";

export interface IncomeSource {
  id: number;
  name: string;
  color: string;
  incomeSourceType: IncomeSourceType;
}
