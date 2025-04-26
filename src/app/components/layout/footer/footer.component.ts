import { Component, OnInit, PLATFORM_ID, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IntersectionObserverService } from '../../../services/intersection-observer.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true
})
export class FooterComponent implements OnInit, AfterViewInit {
  private isBrowser: boolean;
  
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
  }
  
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    
    // Add scroll-triggered animations
    this.setupScrollAnimations();
  }
  
  private setupScrollAnimations(): void {
    // Observe elements that should animate when scrolled into view
    const footerSections = this.elementRef.nativeElement.querySelectorAll('.footer-section');
    
    if (footerSections.length > 0) {
      this.intersectionObserverService.createAndObserve(
        footerSections,
        (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        },
        { threshold: 0.1 }
      );
    }
    
    // Add parallax effect to the background text
    window.addEventListener('scroll', () => {
      const footerBgText = this.elementRef.nativeElement.querySelector('.footer-bg-text');
      if (footerBgText) {
        const scrollPosition = window.scrollY;
        const translateValue = scrollPosition * 0.05;
        footerBgText.style.transform = `translateX(${translateValue}px)`;
      }
    });
  }
}
