import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const processSection = this.el.nativeElement.querySelector('.process-section');
    if (!processSection) return;
    const threadRows = processSection.querySelectorAll('.thread-row');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(processSection, 'in-view');
            threadRows.forEach((row: Element) => this.renderer.addClass(row, 'in-view'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    observer.observe(processSection);
  }
}
