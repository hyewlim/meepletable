import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {ChangePassword} from "../../shared/models";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [MessageService]
})
export class ChangePasswordComponent {

  changeForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private userService: UserService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.changeForm = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      newPassword: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email])
    })
  }

  processForm() {

    const data: ChangePassword = this.changeForm.value as ChangePassword;



    this.userService.changePassword(data)
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