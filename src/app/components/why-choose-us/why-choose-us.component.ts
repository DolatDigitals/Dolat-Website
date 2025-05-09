import { Component, ElementRef, AfterViewInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, BrainIcon, ShieldAlertIcon, DatabaseIcon, MessageSquareCodeIcon, TimerIcon, GraduationCapIcon, RefreshCcwIcon, CheckCircleIcon, ShieldIcon, HandHeartIcon } from 'lucide-angular';

interface Feature {
  icon: any;
  title: string;
  description: string;
  iconClass?: string;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.css']
})
export class WhyChooseUsComponent implements AfterViewInit {
  readonly BrainIcon = BrainIcon;
  readonly ShieldAlertIcon = ShieldAlertIcon;
  readonly DatabaseIcon = DatabaseIcon;
  readonly MessageSquareCodeIcon = MessageSquareCodeIcon;
  readonly TimerIcon = TimerIcon;
  readonly GraduationCapIcon = GraduationCapIcon;
  readonly RefreshCcwIcon = RefreshCcwIcon;
  readonly CheckCircleIcon = CheckCircleIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly HandHeartIcon = HandHeartIcon;

  mainFeatures: Feature[] = [
    {
      icon: this.BrainIcon,
      title: 'AI/ML Projects',
      description: 'Machine Learning, Deep Learning, Neural Networks, Computer Vision, and NLP projects with popular frameworks.',
      iconClass: 'icon-brain'
    },
    {
      icon: this.HandHeartIcon,
      title: 'Digital Marketing',
      description: 'Social Media Marketing, Search Engine Optimization (SEO), Content Creation, Campaign Management, and Marketing Analytics projects using industry-standard tools.',
      iconClass: 'icon-shield'
    },
    {
      icon: this.DatabaseIcon,
      title: 'Data Science',
      description: 'Data Analysis, Visualization, Big Data Processing, and Statistical Modeling using Python and R.',
      iconClass: 'icon-database'
    }
  ];

  secondaryFeatures: Feature[] = [
    {
      icon: this.MessageSquareCodeIcon,
      title: '24/7 Support',
      description: 'Get instant help and updates about your project through our dedicated support team.',
      iconClass: 'icon-message'
    },
    {
      icon: this.TimerIcon,
      title: 'On-time Delivery',
      description: 'We ensure your project is delivered well before the deadline, giving you time to review.',
      iconClass: 'icon-timer'
    },
    {
      icon: this.GraduationCapIcon,
      title: 'Academic Standards',
      description: 'Projects that meet academic requirements and coding best practices.',
      iconClass: 'icon-graduation'
    },
    {
      icon: this.RefreshCcwIcon,
      title: 'Unlimited Revisions',
      description: 'We will revise until you are completely satisfied with your project.',
      iconClass: 'icon-refresh'
    },
    {
      icon: this.CheckCircleIcon,
      title: 'Quality Assurance',
      description: 'Rigorous testing and code review before delivery to ensure perfect functionality.',
      iconClass: 'icon-check'
    },
    {
      icon: this.ShieldIcon,
      title: 'Confidential',
      description: 'Your project details and personal information remain completely confidential.',
      iconClass: 'icon-shieldlock'
    }
  ];

  mainFeaturesVisible: boolean[] = [false, false, false];
  secondaryFeaturesVisible: boolean[] = Array(this.secondaryFeatures.length).fill(false);

  constructor(private el: ElementRef, private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Skip animation logic during SSR
      return;
    }
    // Animate section itself
    const section = this.el.nativeElement.querySelector('.why-choose-us-section');
    if (section) {
      this.observeAndReveal(section, () => {
        section.classList.add('visible');
      });
    }

    // Animate main features with stagger
    const mainCards = this.el.nativeElement.querySelectorAll('.feature-card.main-feature');
    mainCards.forEach((card: Element, i: number) => {
      this.observeAndReveal(card, () => {
        this.ngZone.run(() => this.mainFeaturesVisible[i] = true);
      }, i * 120);
    });

    // Animate secondary features with stagger
    const secondaryCards = this.el.nativeElement.querySelectorAll('.feature-card.secondary-feature');
    secondaryCards.forEach((card: Element, i: number) => {
      this.observeAndReveal(card, () => {
        this.ngZone.run(() => this.secondaryFeaturesVisible[i] = true);
      }, (i + mainCards.length) * 90);
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
