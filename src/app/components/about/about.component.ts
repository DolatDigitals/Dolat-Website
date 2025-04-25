import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperEffectDirective } from './paper-effect';
import { LucideAngularModule, BrainIcon } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PaperEffectDirective, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  readonly BrainIcon = BrainIcon;
}
