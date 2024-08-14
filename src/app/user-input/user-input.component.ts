import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculateInputModel } from '../models/calculate-input-model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<CalculateInputModel>();
  
  initialInvestmentInput: number = 0;
  annualContributionInput: number = 0;
  annualReturnRateInput: number = 5;
  investmentDurationInput: number = 10;
  futureValueInput: number = 0;

  onSubmit() {    
    const calculateInputedValues = new CalculateInputModel({
      initialInvestment: this.initialInvestmentInput,
      annualContribution: this.annualContributionInput,
      annualReturnRate: this.annualReturnRateInput,
      investmentDuration: this.investmentDurationInput,
      futureValue: this.futureValueInput
    });
    
    this.calculate.emit(calculateInputedValues);
  }
}
