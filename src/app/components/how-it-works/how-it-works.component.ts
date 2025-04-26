import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, MessageSquare, Timer, Check, Sparkles } from 'lucide-angular';
import { IconsModule } from '../../icons/icons.module';
import { footprints } from '../../icons/lucide-footprints.icon';

// import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent {
  readonly Search = Search;
  readonly MessageSquare = MessageSquare;
  readonly Timer = Timer;
  readonly Check = Check;
  readonly Sparkles = Sparkles;
  readonly Footprints = footprints;

  steps = [
    {
      icon: Search,
      title: 'Submit Your Requirement',
      description: 'Tell us about your academic project needs and expectations.'
    },
    {
      icon: MessageSquare,
      title: 'Get a Quote',
      description: 'Receive a transparent quote and timeline for your project.'
    },
    {
      icon: Timer,
      title: 'Project Development',
      description: 'Our experts work on your project and keep you updated.'
    },
    {
      icon: Check,
      title: 'Delivery & Support',
      description: 'Get your completed project and post-delivery support.'
    }
  ];
}
