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

    console.log(this.signinForm.value["username"])

    this.userService.authUser(this.signinForm.value)
      .then((data) => {

        if ((<any>data).result === 0) {
          // return error todo
          console.error("user not authenticated")
          alert("wrong authentication")
        } else {
          const newUser = { username: this.signinForm.value["username"], userId: (<any>data).result, ...{} } as User
          this.userService.setUser(newUser);
          this.route.navigate(['collection'])
        }
      })
    // server will return true if user is authenticated, do something..



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
