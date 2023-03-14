import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signinForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: Router,
              ) {
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
        if (result === 0) {

          this.userService.signedInUser.next(this.signinForm.value)
          console.log("User signed in", this.userService.signedInUser)
        }
      })
    // server will return true if user is authenticated, do something..

    this.route.navigate(['collection'])

  }

  // showDialogError() {
  //
  //   const dialogConfig = {
  //     header: 'Error',
  //     content: 'An error occurred.',
  //     closable: false,
  //     modal: true,
  //     styleClass: 'error-dialog',
  //     baseZIndex: 10000,
  //     autoZIndex: false,
  //     closeOnEscape: true,
  //     showHeader: true,
  //     draggable: true,
  //     resizable: true,
  //     width: '300px',
  //     height: 'auto',
  //     position: {
  //       top: '50px',
  //       left: '50px'
  //     }
  //   }
  //
  //   // @ts-ignore
  //   this.dialogService.open(SigninComponent, dialogConfig)
  //
  //
  // }


}
