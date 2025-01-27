import { Component, OnInit, Input } from '@angular/core';
import { Tickets } from '../interfaces/tickets.interface';

@Component({
  selector: 'app-boardcard',
  templateUrl: './boardcard.component.html',
  styleUrls: ['./boardcard.component.css']
})
export class BoardcardComponent implements OnInit {
  @Input() ticket!: Tickets;

  constructor() { }

  ngOnInit(): void {
  }

}
