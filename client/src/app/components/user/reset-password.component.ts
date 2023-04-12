import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.resetForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)])
    })

  }

  processForm() {
    console.log(this.resetForm.value['password']);
  }
}
