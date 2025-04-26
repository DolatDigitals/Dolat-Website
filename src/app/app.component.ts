import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { WhatsappPopupComponent } from './whatsapp-popup/whatsapp-popup.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent, 
    WhatsappPopupComponent,
    WhyChooseUsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dolatPortfolio';
  showWhatsapp = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.showWhatsapp = true;
    }, 3000);
  }
}
