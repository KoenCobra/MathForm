import {AbstractControl} from "@angular/forms";

export class CustomValidators {
  static addition(form: AbstractControl){
    const {a, b, answer} = form.value;
    if (a + b === parseInt(answer)) {
      return null
    }
    return {addition: true};
  }
}
