import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "../../shared/models";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              ) {
  }

  ngOnInit(): void {

    this.signinForm = this.createForm()
  }

  createForm(): FormGroup {

    return this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', Validators.required)

    })

  }

  processForm() {

    this.userService.authUser(this.signinForm.value as User)
      .then(r => {
        //todo navigation
        if (this.userService.isLoggedIn$){
          this.router.navigate(['collection'])
        } else {
          this.router.navigate(['signin'])
        }

      })
      .catch(
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['signin'])
            alert("username or password is wrong, please try again")
          }
          throw error;
        }
      )
  }

  toRegister() {
    this.router.navigate(['signup'])
  }

  forget() {
    this.router.navigate(['forget'])
  }
}
