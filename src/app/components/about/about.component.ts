import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperEffectDirective } from './paper-effect';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PaperEffectDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}
