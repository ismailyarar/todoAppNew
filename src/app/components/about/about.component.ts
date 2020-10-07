import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  favoriteSeason: string;
  seasons: string[] = ['adem', 'ismail', 'Summer', 'Autumn'];

  constructor() {}

  ngOnInit(): void {}
}
