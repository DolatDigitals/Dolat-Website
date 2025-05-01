import { Component, AfterViewInit, ElementRef, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
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
export class HowItWorksComponent implements AfterViewInit {
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

  stepsVisible: boolean[] = Array(3).fill(false);

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const section = this.el.nativeElement.querySelector('.how-it-works-section');
    if (section) {
      this.observeAndReveal(section, () => {
        section.classList.add('visible');
      });
    }
    const stepCards = [
      this.el.nativeElement.querySelectorAll('.step-description')[0],
      this.el.nativeElement.querySelectorAll('.step-description')[1],
      this.el.nativeElement.querySelectorAll('.step-description')[2],
    ];
    stepCards.forEach((card: Element, i: number) => {
      if (card) {
        this.observeAndReveal(card, () => {
          this.ngZone.run(() => this.stepsVisible[i] = true);
        }, i * 120);
      }
    });
  }

  private observeAndReveal(element: Element, callback: () => void, delay = 0) {
    if (!('IntersectionObserver' in window)) {
      callback();
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(callback, delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    observer.observe(element);
  }
}
