import { Component, ElementRef, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PaperEffectDirective } from './paper-effect';
import { 
  LucideAngularModule, 
  BrainIcon, 
  ShieldAlertIcon, 
  DatabaseIcon, 
  MessageSquareCodeIcon, 
  TimerIcon, 
  GraduationCapIcon, 
  RefreshCcwIcon, 
  CheckCircleIcon, 
  ShieldIcon 
} from 'lucide-angular';
import { IntersectionObserverService } from '../../services/intersection-observer.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PaperEffectDirective, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  readonly BrainIcon = BrainIcon;
  readonly ShieldAlertIcon = ShieldAlertIcon;
  readonly DatabaseIcon = DatabaseIcon;
  readonly MessageSquareCodeIcon = MessageSquareCodeIcon;
  readonly TimerIcon = TimerIcon;
  readonly GraduationCapIcon = GraduationCapIcon;
  readonly RefreshCcwIcon = RefreshCcwIcon;
  readonly CheckCircleIcon = CheckCircleIcon;
  readonly ShieldIcon = ShieldIcon;
  
  private isBrowser: boolean;
  
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    if (!this.isBrowser) {
      // Skip browser-specific code during server-side rendering
      return;
    }
  }
  
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    
    // Setup scroll-triggered animations
    this.setupScrollAnimations();
  }
  
  private setupScrollAnimations(): void {
    // Observe feature cards for scroll-based animations
    const whyChooseUsSection = this.elementRef.nativeElement.querySelector('.why-choose-us');
    if (whyChooseUsSection) {
      this.intersectionObserverService.createAndObserve(
        [whyChooseUsSection],
        (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        },
        { threshold: 0.1 }
      );
    }
    
    // Add subtle parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Animate feature cards on scroll
      const featureCards = this.elementRef.nativeElement.querySelectorAll('.feature-card--main, .feature-card--secondary');
      featureCards.forEach((card: Element, index: number) => {
        const translateY = scrollPosition * 0.02 * (index % 3 + 1) / 10;
        (card as HTMLElement).style.transform = `translateY(-${translateY}px)`;
      });
    });
  }
}
