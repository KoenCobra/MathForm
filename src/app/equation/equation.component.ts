import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom-validators";
import {delay, filter, scan} from "rxjs";

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.scss']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter(value => value === 'VALID'),
        delay(200),
        scan((acc, value) => {
          return {
            numbersSolved: acc.numbersSolved + 1,
            startTime: acc.startTime
          }
        }, {numbersSolved: 0, startTime: new Date()})
      )
      .subscribe(({numbersSolved, startTime}) => {
        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numbersSolved / 1000
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
        })
      })
  }

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [
    CustomValidators.addition('answer', 'a', 'b')
  ])

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
