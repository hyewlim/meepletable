import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models";
import {UserService} from "./user.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private route: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.signupForm = this.createForm();
    this.signupForm.reset();

  }

  createForm(): FormGroup {

    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)])
    })

  }

  processForm() {

    this.userService.registerNewUser(this.signupForm.value as User)
      .then( (response) => {
        this.route.navigate(['signin'])
        alert("You have successfully registered! Please sign in using the same credentials.")
      })
      .catch(
        (error) => {
          if (error.status === 400) {
            alert("username and/or password is unavailable, please try again")
          }
          throw error;
        }
      )

  }

}
