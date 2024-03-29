import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models";
import {UserService} from "./user.service";
import {MessageService} from "primeng/api";
import {passwordMatchValidator} from "./custom-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private route: Router,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.signupForm = this.createForm();
    this.signupForm.reset();

  }

  createForm(): FormGroup {

    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    }, {validators: passwordMatchValidator})

  }

  processForm() {

    this.userService.registerNewUser(this.signupForm.value as User)
      .then( (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have successfully registered! Please sign in using the same credentials.'})

        setTimeout(() => {
          this.route.navigate(['signin'])
        }, 2000)
      })
      .catch(
        (error) => {
          if (error.status === 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'Unavailable',
              detail: 'username and/or password is unavailable, please try again'})
          }
          throw error;
        }
      )
  }

}
