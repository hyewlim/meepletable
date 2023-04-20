import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers: [MessageService]
})
export class ForgetPasswordComponent {
  resetForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private messageService: MessageService
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

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'If your email exists, you will receive instructions to reset your password.'})

    this.userService.resetPassword(this.resetForm.value['email'])

  }
}
