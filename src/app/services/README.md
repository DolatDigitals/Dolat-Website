# Services

This directory contains Angular services that can be used across multiple components.

## IntersectionObserverService

The `IntersectionObserverService` provides a simple way to implement scroll-based animations by wrapping the browser's IntersectionObserver API.

### Features

- Server-side rendering (SSR) compatible - automatically detects browser environment
- Simplifies setting up IntersectionObservers with type safety
- Provides one-time observers that automatically disconnect after detecting intersection
- Handles the conversion from NodeList to array for convenience

### Usage

#### 1. Basic usage:

```typescript
constructor(private intersectionObserverService: IntersectionObserverService) {}

ngAfterViewInit(): void {
  const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
  
  this.intersectionObserverService.createAndObserve(
    elements,
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    },
    { threshold: 0.2 } // Optional configuration
  );
}
```

#### 2. One-time observer (disconnects after intersection):

```typescript
this.intersectionObserverService.createOneTimeObserver(
  elements,
  (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  }
);
```

#### 3. CSS Animation Example

Add transition properties to your elements:

```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Tips

- For cascading animations, you can use the element index to add delays:

```typescript
const elements = this.elementRef.nativeElement.querySelectorAll('.step-item');

this.intersectionObserverService.createAndObserve(
  elements,
  (entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(elements).indexOf(entry.target as Element);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150); // 150ms delay between each element
    }
  }
);
```

- Remember to check for browser environment when working with DOM:

```typescript
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}

ngAfterViewInit(): void {
  if (!this.isBrowser) return; // Skip during SSR
  
  // Your observer code here
}
``` 