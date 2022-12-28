import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isLoaded: boolean;

  constructor() {
    this.isLoaded = false;
   }

  ngOnInit(): void {
  }

  renderLayout() {
    this.isLoaded = true;
  }
}
