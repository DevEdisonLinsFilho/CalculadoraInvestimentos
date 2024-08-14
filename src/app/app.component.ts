import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { CalculateInputModel } from './models/calculate-input-model';
import { CalculateComponent } from "./calculate/calculate.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, CalculateComponent],
})
export class AppComponent {
  calculateInput!: CalculateInputModel
  
  onFillCalculeFields(data: CalculateInputModel) {
    this.calculateInput = data;    
  }

}
