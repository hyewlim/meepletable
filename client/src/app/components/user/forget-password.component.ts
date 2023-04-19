import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./user.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  resetForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private userService: UserService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email])
    })
  }

  processForm() {
      this.userService.resetPassword(this.resetForm.value['email'])
        .then(
          v=> {
            console.log(v)
            alert("If your email exists, you will receive instructions to reset your password.")
          }
        )
  }
}
