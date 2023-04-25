import {Directive, ElementRef, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";
import {filter, map} from "rxjs";

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective implements OnInit {
  constructor(private el: ElementRef, private controlName: NgControl) {

  }

  ngOnInit() {
    this.controlName.control?.parent?.valueChanges
      .pipe(
        map(({a, b, answer}) => Math.abs((a + b - answer) / (a + b))),
      )
      .subscribe(value => {
          if (value === 0) {
            this.el.nativeElement.classList.add('correct');
          } else if (value < 0.2) {
            this.el.nativeElement.classList.add('close');
          } else {
            this.el.nativeElement.className = '';
          }
        }
      )
  }
}
