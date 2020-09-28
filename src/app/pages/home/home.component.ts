import { Component } from '@angular/core';
import publicData from './../../public-data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  features: object[] = publicData.features;

}
