import { Component, Input, OnInit } from '@angular/core';
import { Tv } from 'src/app/models/tvs';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from './../../constant/images-sizes';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor() { }

  ngOnInit(): void {
  }

}
