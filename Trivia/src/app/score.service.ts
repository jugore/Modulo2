import { Injectable } from '@angular/core';
import { Player } from './player.model';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  players:Player[]=
  [
    new Player(1," Esteban ",20),
    new Player(2," Carlos ",15),
    new Player(3," Duckster ",9),
  ]
  constructor() { }
}
