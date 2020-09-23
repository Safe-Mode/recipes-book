import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

import { AnimationsService } from '../../services/animations.service';
import * as Animation from '../../animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', useAnimation(Animation.fade))
    ])
  ]
})
export class RecipesComponent {

  constructor(private animations: AnimationsService) {
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return this.animations.prepareRoute(outlet);
  }

}
