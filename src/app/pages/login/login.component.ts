import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = new FormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    let username = this.form.get('username')?.value;
    let psswd = this.form.get('password')?.value;

    this.authService.login(username, psswd)
    .subscribe({
      next: (result) => {
        this.router.navigate(['/recover-files'])
      },
      error: (error) => {
        //TODO: finish this
      }
    })

  }

}
