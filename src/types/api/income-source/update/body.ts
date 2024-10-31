export interface UpdateIncomeSourceBody {
  id: number
  body: {
    name: string;
    color: string;
    incomeSourceTypeCode: string;
  };
}
