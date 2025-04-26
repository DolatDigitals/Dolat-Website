import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, BriefcaseIcon } from 'lucide-angular';
import { IntersectionObserverService } from '../../services/intersection-observer.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  readonly BriefcaseIcon = BriefcaseIcon;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef,
    private intersectionObserverService: IntersectionObserverService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      // Skip browser-specific code during server-side rendering
      return;
    }

    console.log('Hero component initialized');
  }
  
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    
    // Add scroll animation effects if needed
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = this.elementRef.nativeElement.querySelector('.hero');
      
      if (scrollPosition > 50) {
        // Add subtle parallax or other effects on scroll if desired
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Hero elements appear animation - can be controlled through CSS animations
    // but if you want to use IntersectionObserver for specific elements:
    const heroElements = this.elementRef.nativeElement.querySelectorAll('.hero-animate-on-scroll');
    if (heroElements.length > 0) {
      this.intersectionObserverService.createOneTimeObserver(
        heroElements,
        (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        },
        { threshold: 0.1 }
      );
    }
  }
}
