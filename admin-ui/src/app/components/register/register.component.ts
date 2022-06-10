import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = false;

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get usernameControl() {
    return this.form.get("username") as FormControl;
  }

  get passwordControl() {
    return this.form.get("password") as FormControl;
  }

  register(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      this.authService.register(value.username, value.password).subscribe(
        data => {
          this.form.reset()
          this.submitted = false;
        },
        error => {
          this.error = true;
        }
      );
    }
  }
}
