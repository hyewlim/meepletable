import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
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
              private route: Router) {
  }

  ngOnInit(): void {

    this.signinForm = this.createForm()
  }

  createForm(): FormGroup {

    return this.fb.group({
      username: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required)

    })

  }

  processForm() {

    this.userService.authUser(this.signinForm.value)
      .then((result) => {
        if (result) {
          this.userService.signedInUser.next(this.signinForm.value)
          console.log("User signed in", this.userService.signedInUser)
        }
      })
    // server will return true if user is authenticated, do something..

    this.route.navigate(['collection'])

  }


}
