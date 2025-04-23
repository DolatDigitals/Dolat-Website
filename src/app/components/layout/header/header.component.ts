import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      // Skip browser-specific code during server-side rendering
      return;
    }
    
    // Check if the theme is already applied to the document
    const documentHasDarkClass = document.documentElement.classList.contains('dark-mode');
    
    // Clear any existing classes from body
    document.body.classList.remove('light-mode');
    document.body.classList.remove('dark-mode');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || documentHasDarkClass) {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      this.isDarkMode = false;
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.style.colorScheme = 'light';
    }

    // Instead of force repaint, use a more reliable approach to prevent flashing
    // Add a class to indicate theme is initialized
    document.documentElement.classList.add('theme-initialized');
    
    // Listen for system theme preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) { // Only react if user hasn't set preference
        this.isDarkMode = e.matches;
        this.toggleTheme(null, true);
      }
    });
    
    console.log('Header initialized theme:', this.isDarkMode ? 'dark' : 'light');
  }

  toggleTheme(event: Event | null, skipSave = false): void {
    if (!this.isBrowser) {
      return;
    }
    
    if (event) {
      event.preventDefault();
    }
    
    this.isDarkMode = !this.isDarkMode;
    
    // Add a transition class to smooth the change
    document.documentElement.classList.add('theme-transitioning');
    
    // Remove existing classes from both body and documentElement to reset
    document.body.classList.remove('light-mode');
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('light-mode');
    document.documentElement.classList.remove('dark-mode');
    
    // Apply the appropriate class to both body and documentElement
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.backgroundColor = '#000000';
    } else {
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode');
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.style.backgroundColor = '#ffffff';
    }

    // Save preference to localStorage unless called from system preference change
    if (!skipSave) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
    
    // Remove transition class after change is complete
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
    
    // Dispatch theme change event for other components
    const themeEvent = new CustomEvent('themeChanged', {
      detail: { isDarkMode: this.isDarkMode },
      bubbles: true
    });
    document.body.dispatchEvent(themeEvent);
    
    console.log('Theme toggled:', this.isDarkMode ? 'dark' : 'light');
  }
}
