import {Component, EventEmitter, OnInit} from '@angular/core';
import {animate, group, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    trigger('square', [
      state('normal', style({
        backgroundColor: "purple",
        border: '2px solid #444',
        borderRadius: '0'
      })),
      state('wild', style({
        backgroundColor: "gray",
        border: 'none',
        borderRadius: '50%'
      })),
      transition('void => normal', [
        style({transform: 'translateX(-50vw)'}),
        animate("0.3s cubic-bezier(0.5,2.5,0.5,-0.2)")
      ] ),
      transition('normal => wild', group([
        animate(100, style({
          backgroundColor: "yellow"
        })),
        animate("0.5s cubic-bezier(.27,1.42,.85,-0.28)", style({
          backgroundColor: "purple",
          borderRadius: '50%'
        }))
        ])
      )
    ]),
    trigger("list", [
      transition(':enter', query('mat-list-item', [
        style({
          opacity:0,
          transform: 'translateX(-50vw)'
        }),
        stagger(200, animate(300))
      ])),
      transition(':leave', query('mat-list-item', [
        stagger(100, animate(500,
          style({
          opacity:0,
          transform: 'translateX(50vw)'
        })))
      ]))
    ])
  ]
})
export class AnimationsComponent implements OnInit {

  public state = "normal";
  public display = true;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(event: any): void {
    if(event.phaseName === 'done') {
      this.display = !this.display;
    }
  }

}
