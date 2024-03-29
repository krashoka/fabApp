import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  public buttonClicked: EventEmitter<void> = new EventEmitter<void>();
}