import { Component } from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ChangePassword} from "../../shared/models";
import {passwordMatchValidator} from "./custom-validators";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [MessageService]
})
export class ResetPasswordComponent {

  changeForm!: FormGroup;
  uuid!: string;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.uuid = this.route.snapshot.params['uuid']

    this.changeForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      confirmPassword: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),

    }, {validators: passwordMatchValidator})
  }

  processForm() {

    console.log(this.changeForm)

    this.userService.resetPassword(this.uuid, this.changeForm.value['password'])
      .then(
      value => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You have successfully changed your password! Please sign in using your new password.'})
        setTimeout(() => {
          this.router.navigate(['signin']);
          this.userService.logOutUser();
        }, 2000)
      })
      .catch(
      (error) => {
        if (error.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Wrong credentials',
            detail: 'Unable to change password, please try again'})
        }
        throw error;
      }
    )

  }
}
