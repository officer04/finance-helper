import { IncomeSourceType } from "./Income-source-type";

export interface IncomeSource {
  id: number;
  name: string;
  color: string;
  incomeSourceType: IncomeSourceType;
}
