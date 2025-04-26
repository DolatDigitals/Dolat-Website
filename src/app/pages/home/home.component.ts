import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
// import { ProjectsComponent } from '../../components/projects/projects.component';
// import { ServicesComponent } from '../../components/services/services.component';
// import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    // ProjectsComponent,
    // ServicesComponent,
    HowItWorksComponent,
    // TestimonialsComponent,
    ContactComponent,
    WhyChooseUsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
