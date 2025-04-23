import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false;
  private isBrowser: boolean;
  private observer: MutationObserver | null = null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      // Skip browser-specific code during server-side rendering
      return;
    }

    // Immediately apply the current theme
    this.checkAndApplyCurrentTheme();
    
    // Set up MutationObserver to watch for theme class changes on document level
    this.setupThemeObserver();
    
    // Listen for theme changes through custom events
    document.body.addEventListener('themeChanged', this.handleThemeChange);
  }
  
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.isBrowser) {
      document.body.removeEventListener('themeChanged', this.handleThemeChange);
    }
  }
  
  /**
   * Check the current theme status and apply it
   */
  private checkAndApplyCurrentTheme(): void {
    // Check if html or body has dark-mode class
    this.isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                      document.body.classList.contains('dark-mode');
    
    console.log('Hero detected dark mode on init:', this.isDarkMode);
    
    // Force immediate application of the theme
    window.requestAnimationFrame(() => {
      this.applyThemeToHero();
    });
  }
  
  /**
   * Handle theme change events
   */
  private handleThemeChange = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent && customEvent.detail) {
      this.isDarkMode = customEvent.detail.isDarkMode;
      console.log('Hero received theme change event:', this.isDarkMode ? 'dark' : 'light');
      
      // Force immediate application of the theme
      window.requestAnimationFrame(() => {
        this.applyThemeToHero();
      });
    }
  }
  
  /**
   * Setup an observer to watch for class changes on document element
   */
  private setupThemeObserver(): void {
    // Create an observer to watch for class changes on <html> element
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          const isDarkMode = document.documentElement.classList.contains('dark-mode');
          if (this.isDarkMode !== isDarkMode) {
            this.isDarkMode = isDarkMode;
            console.log('Hero detected theme change via MutationObserver:', this.isDarkMode ? 'dark' : 'light');
            this.applyThemeToHero();
          }
        }
      }
    });
    
    // Start observing
    this.observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['class']
    });
  }

  /**
   * Apply the appropriate theme class to the hero element
   */
  private applyThemeToHero(): void {
    if (!this.isBrowser) return;
    
    // Find all hero elements and update their classes
    const heroElements = document.querySelectorAll('.hero');
    heroElements.forEach(element => {
      // Force style recalculation
      element.classList.remove('dark-theme', 'light-theme');
      
      // Force a reflow to ensure classes are properly removed
      void (element as HTMLElement).offsetWidth;
      
      // Apply the correct theme
      if (this.isDarkMode) {
        element.classList.add('dark-theme');
      } else {
        element.classList.add('light-theme');
      }
    });
  }
}
