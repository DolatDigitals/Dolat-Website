import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Creates and sets up an IntersectionObserver to watch elements
   * @param elements - NodeList or Array of elements to observe
   * @param callback - Function to execute when intersection changes
   * @param options - IntersectionObserver options
   * @returns The created IntersectionObserver instance
   */
  createAndObserve(
    elements: NodeListOf<Element> | Element[], 
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = { threshold: 0.1 }
  ): IntersectionObserver | null {
    // Skip in server-side rendering
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          callback(entry);
        });
      },
      options
    );

    // Convert to array if it's a NodeList
    const elementsArray = Array.from(elements);
    
    // Start observing each element
    elementsArray.forEach((element: Element) => {
      observer.observe(element);
    });

    return observer;
  }

  /**
   * Creates a one-time observer that disconnects after the element becomes visible
   * @param elements - NodeList or Array of elements to observe
   * @param callback - Function to execute when elements become visible
   * @param options - IntersectionObserver options
   */
  createOneTimeObserver(
    elements: NodeListOf<Element> | Element[],
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = { threshold: 0.1 }
  ): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry);
            // Stop observing once it's visible
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    // Convert to array if it's a NodeList
    const elementsArray = Array.from(elements);
    
    // Start observing each element
    elementsArray.forEach((element: Element) => {
      observer.observe(element);
    });
  }
} 