import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../shared/models";
import {UserService} from "../../shared/user.service";

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
      username: this.fb.control<string>('', Validators.required),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', Validators.required)

    })

  }

  processForm() {

    console.log(this.signupForm.value)
    this.userService.postNewUser(this.signupForm.value as User)

    this.route.navigate(['collection'])


  }
}
