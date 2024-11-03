export interface IncomeSourceInfo {
  id: number;
  name: string;
  color: string;
  incomeSourceTypeCode: {
    code: string;
    name: string;
  };
}
