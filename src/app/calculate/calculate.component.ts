import { Component, Input, SimpleChanges } from '@angular/core';
import { CalculateInputModel } from '../models/calculate-input-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent {
  @Input() calculateInput: CalculateInputModel = new CalculateInputModel();
  initialInvestmentRequired: number = 0;
  annualReturnRateRequired: number = 0;
  results: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calculateInput']) {
      this.calculateInitialInvestment();
      this.calculateAnnualReturnRate();
      this.calculateInvestmentResults();
    }
  }

  calculateInitialInvestment() {
    const annualReturnRateDecimal = this.calculateInput.annualReturnRate / 100;
    const years = this.calculateInput.investmentDuration;
    const annualContribution = this.calculateInput.annualContribution;

    this.initialInvestmentRequired = (this.calculateInput.futureValue - annualContribution * ((Math.pow(1 + annualReturnRateDecimal, years) - 1) / annualReturnRateDecimal)) / Math.pow(1 + annualReturnRateDecimal, years);
  }

  calculateAnnualReturnRate() {
    let minRate = 0;
    let maxRate = 1;
    const precision = 0.0001;

    while (maxRate - minRate > precision) {
      const midRate = (minRate + maxRate) / 2;
      const calculatedFutureValue = this.calculateFutureValue(this.calculateInput.initialInvestment, this.calculateInput.annualContribution, midRate, this.calculateInput.investmentDuration);

      if (calculatedFutureValue < this.calculateInput.futureValue) {
        minRate = midRate;
      } else {
        maxRate = midRate;
      }
    }

    this.annualReturnRateRequired = (minRate + maxRate) * 100;
  }

  calculateFutureValue(initialInvestment: number, annualContribution: number, annualReturnRate: number, duration: number): number {
    return initialInvestment * Math.pow(1 + annualReturnRate, duration) + annualContribution * ((Math.pow(1 + annualReturnRate, duration) - 1) / annualReturnRate);
  }

  calculateInvestmentResults() {
    const annualReturnRateDecimal = this.calculateInput.annualReturnRate / 100;
    const years = this.calculateInput.investmentDuration;
    const annualContribution = this.calculateInput.annualContribution;
    let investmentValue = this.calculateInput.initialInvestment;
    
    this.results = [];
  
    for (let i = 0; i < years; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * annualReturnRateDecimal;
      investmentValue += interestEarnedInYear + annualContribution;
      const totalInterest = investmentValue - annualContribution * year - this.calculateInput.initialInvestment;
      this.results.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualContribution,
        totalInterest: totalInterest,
        totalAmountInvested: this.calculateInput.initialInvestment + annualContribution * year
      });
    }
  }
}
