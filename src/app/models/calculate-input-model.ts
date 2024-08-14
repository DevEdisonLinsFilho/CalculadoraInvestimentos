export class CalculateInputModel {
  public investmentDuration: number; // Duration of investment in years
  public annualReturnRate: number; // Expected annual return rate (percentage)
  public annualContribution: number; // Amount contributed annually
  public initialInvestment: number; // Initial investment amount
  public futureValue: number; // Expected future value of the investment

  constructor(init?: Partial<CalculateInputModel>) {
      this.investmentDuration = init?.investmentDuration ?? 0;
      this.annualReturnRate = init?.annualReturnRate ?? 0;
      this.annualContribution = init?.annualContribution ?? 0;
      this.initialInvestment = init?.initialInvestment ?? 0;
      this.futureValue = init?.futureValue ?? 0;
  }
}
