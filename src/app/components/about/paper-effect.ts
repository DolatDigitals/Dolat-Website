import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[paperEffect]'
})
export class PaperEffectDirective implements AfterViewInit {
  private readonly maxTilt = 8; // degrees (reduced for subtlety)
  private readonly scale = 1.018; // less scaling for subtlety
  private readonly animDuration = 420; // ms, longer for smoothness

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.animDuration}ms cubic-bezier(.22,1,.36,1), box-shadow ${this.animDuration}ms cubic-bezier(.22,1,.36,1)`);
    this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform, box-shadow');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = this.maxTilt * ((x - centerX) / centerX);
    const rotateX = -this.maxTilt * ((y - centerY) / centerY);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 8px 22px 0 rgba(37,99,235,0.12), 0 1.5px 6px 0 rgba(30,64,175,0.04)');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.animDuration}ms cubic-bezier(.22,1,.36,1), box-shadow ${this.animDuration}ms cubic-bezier(.22,1,.36,1)`);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotateX(0deg) rotateY(0deg) scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 6px 18px 0 rgba(37,99,235,0.08), 0 1.5px 6px 0 rgba(30,64,175,0.02)');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', `transform ${this.animDuration}ms cubic-bezier(.22,1,.36,1), box-shadow ${this.animDuration}ms cubic-bezier(.22,1,.36,1)`);
  }
}
