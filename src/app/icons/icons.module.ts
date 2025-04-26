import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { footprints } from './lucide-footprints.icon';

@NgModule({
  imports: [LucideAngularModule.pick({ footprints })],
  exports: [LucideAngularModule]
})
export class IconsModule {}
