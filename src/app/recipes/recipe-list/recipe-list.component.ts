import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe',
      'Simple test description',
      'https://cdn.apartmenttherapy.info/image/upload/v1564775676/k/Photo/Recipes/2019-08-how-to-juiciest-turkey-meatballs/How-to-Make-the-Best-Juiciest-Turkey-Meatballs_055.jpg'
    ),
    new Recipe(
      'Test Recipe',
      'Simple test description',
      'https://cdn.apartmenttherapy.info/image/upload/v1564775676/k/Photo/Recipes/2019-08-how-to-juiciest-turkey-meatballs/How-to-Make-the-Best-Juiciest-Turkey-Meatballs_055.jpg'
    )
  ];

  constructor() { }

  ngOnInit() {
  }

}
