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
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', Validators.required)

    })

  }

  processForm() {

    this.userService.authUser(this.signinForm.value as User)
      .then(r => {
        this.route.navigate(['collection'])
      } )


    // this.userService.authUser(this.signinForm.value)
    //   .then((data) => {
    //
    //     if ((<any>data).result === 0) {
    //       // return error todo
    //       console.error("user not authenticated")
    //       alert("wrong authentication")
    //     } else {
    //       const newUser = { username: this.signinForm.value["username"], userId: (<any>data).result, ...{} } as User
    //       this.userService.setUser(newUser);
    //       this.route.navigate(['collection'])
    //     }
    //   })
    // server will return true if user is authenticated, do something..



  }

}
